const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const CONTENT_DIR = path.join(__dirname, '../content');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Ensure public directory exists
fs.ensureDirSync(PUBLIC_DIR);

/**
 * Sync content from content/ directory to public/ directory
 * This allows the React app to fetch content files via HTTP
 */
async function syncContent() {
  try {
    console.log('🔄 Syncing content from content/ to public/...');
    
    // Get all subdirectories in content/
    const contentDirs = await fs.readdir(CONTENT_DIR);
    
    for (const dir of contentDirs) {
      const contentDirPath = path.join(CONTENT_DIR, dir);
      const publicDirPath = path.join(PUBLIC_DIR, dir);
      
      // Check if it's a directory
      const stat = await fs.stat(contentDirPath);
      if (stat.isDirectory()) {
        // Ensure the public subdirectory exists
        await fs.ensureDir(publicDirPath);
        
        // Copy all files from content subdirectory to public subdirectory
        await fs.copy(contentDirPath, publicDirPath, {
          overwrite: true,
          filter: (src) => {
            // Only copy .md files
            return src.endsWith('.md') || fs.statSync(src).isDirectory();
          }
        });
        
        console.log(`✅ Synced ${dir}/ directory`);
      }
    }
    
    console.log('🎉 Content sync completed successfully!');
    
    // Add timestamp to track last sync
    const syncInfo = {
      lastSync: new Date().toISOString(),
      message: 'Content synced from content/ to public/'
    };
    
    await fs.writeJson(path.join(PUBLIC_DIR, '.content-sync.json'), syncInfo, { spaces: 2 });
    
  } catch (error) {
    console.error('❌ Error syncing content:', error);
    process.exit(1);
  }
}

/**
 * Watch for changes in content directory and auto-sync
 */
function watchContent() {
  console.log('👀 Watching content directory for changes...');
  
  const watcher = chokidar.watch(CONTENT_DIR, {
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: true
  });

  watcher
    .on('add', (filePath) => {
      console.log(`📄 File added: ${path.relative(CONTENT_DIR, filePath)}`);
      syncContent();
    })
    .on('change', (filePath) => {
      console.log(`📝 File changed: ${path.relative(CONTENT_DIR, filePath)}`);
      syncContent();
    })
    .on('unlink', (filePath) => {
      console.log(`🗑️  File removed: ${path.relative(CONTENT_DIR, filePath)}`);
      syncContent();
    });

  return watcher;
}

// Run sync immediately
syncContent().then(() => {
  // If running with --watch flag, start watching
  if (process.argv.includes('--watch')) {
    const watcher = watchContent();
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down content watcher...');
      watcher.close();
      process.exit(0);
    });
    
    // Keep the process alive
    console.log('🚀 Content watcher started. Press Ctrl+C to stop.');
  }
});

module.exports = { syncContent, watchContent };
