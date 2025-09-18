import { useEffect } from 'react';

export const useContentRefresh = () => {
  useEffect(() => {
    // Listen for Netlify CMS save events
    const handleCMSUpdate = () => {
      console.log('CMS content updated, refreshing page...');
      // Small delay to ensure files are written
      setTimeout(() => window.location.reload(), 500);
    };

    // Listen for custom events from CMS
    window.addEventListener('cms-save', handleCMSUpdate);
    
    // Listen for Netlify Identity and CMS events
    window.addEventListener('message', (event) => {
      if (event.data) {
        // Handle Netlify Identity login
        if (event.data.type === 'NETLIFY_IDENTITY_LOGIN') {
          console.log('User logged in to Netlify Identity');
          // Don't auto-refresh on login, let user navigate
        }
        
        // Handle Netlify CMS events
        if (event.data.type === 'NETLIFY_CMS_SAVE') {
          console.log('Netlify CMS save event detected');
          handleCMSUpdate();
        }
        
        // Handle generic CMS events
        if (event.origin === window.location.origin && 
            (event.data.includes && event.data.includes('cms'))) {
          console.log('Generic CMS event detected');
          handleCMSUpdate();
        }
      }
    });

    // Listen for focus events (when user returns to tab after editing)
    const handleFocus = () => {
      // Check if we're in CMS admin
      if (window.location.pathname.includes('/admin')) {
        return;
      }
      
      // Refresh content when user returns to main site from CMS
      const lastRefresh = sessionStorage.getItem('lastContentRefresh');
      const now = Date.now();
      
      if (!lastRefresh || now - parseInt(lastRefresh) > 30000) { // 30 seconds cooldown
        console.log('Page focus detected, checking for content updates...');
        sessionStorage.setItem('lastContentRefresh', now.toString());
        // Small delay to check for updates
        setTimeout(() => window.location.reload(), 1000);
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('cms-save', handleCMSUpdate);
      window.removeEventListener('message', handleCMSUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);
};

