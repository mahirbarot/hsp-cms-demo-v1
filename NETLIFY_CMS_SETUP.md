# Netlify CMS Integration Setup

This React application has been integrated with Netlify CMS to allow dynamic content management. Here's how to set it up and use it:

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm start
```

### 3. Access CMS Admin
Navigate to `http://localhost:3000/admin` to access the Netlify CMS admin interface.

## 📁 Content Structure

The CMS is configured to manage the following content types:

### Hero Section
- **Location**: `/admin` → Hero Section
- **Fields**: Title, Subtitle, Background Image
- **File**: `content/hero/hero.md`

### About Section
- **Location**: `/admin` → About Section
- **Fields**: Title, Image, Description, Vision Title/Text, Approach Title/Text
- **File**: `content/about/about.md`

### Services
- **Location**: `/admin` → Services
- **Fields**: Title, Description
- **Files**: `content/services/[service-name].md`
- **Add/Remove**: You can add or remove services dynamically

### Projects
- **Location**: `/admin` → Projects
- **Fields**: Title, Category, Year, Image, Description, Featured
- **Files**: `content/projects/[project-name].md`
- **Add/Remove**: You can add new projects or remove existing ones

### Gallery
- **Location**: `/admin` → Gallery
- **Fields**: Title, Image, Alt Text, Order
- **Files**: `content/gallery/[gallery-item].md`
- **Add/Remove**: You can add new gallery items or remove existing ones

### Footer
- **Location**: `/admin` → Footer
- **Fields**: Company Name, Tagline, Copyright Year, Links
- **File**: `content/footer/footer.md`

## 🖼️ Image Management

- All images are stored in `public/images/`
- Images uploaded through the CMS will be automatically saved to this directory
- The CMS supports image uploads with automatic optimization

## 🌐 Deployment to Netlify

### 1. Connect to Netlify
1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Enable Git Gateway in Netlify settings

### 2. Enable Git Gateway
1. Go to Netlify Dashboard → Site Settings → Identity
2. Enable Identity service
3. Go to Identity → Services → Git Gateway
4. Enable Git Gateway

### 3. Configure Authentication
The CMS will automatically handle authentication through Netlify Identity.

## ✏️ Content Management Features

### Dynamic Content Updates
- All text content can be updated through the CMS
- Images can be changed without touching code
- Services can be added/removed dynamically
- Projects can be added/removed dynamically
- Gallery items can be added/removed dynamically

### Real-time Preview
- Changes are saved as markdown files in the `content/` directory
- The React app automatically loads content from these files
- No code changes required for content updates

### Content Validation
- All fields are validated in the CMS interface
- Required fields are marked and enforced
- Image uploads are optimized automatically

## 🔧 Technical Details

### Content Loading
- The app uses React Context (`ContentContext`) to manage content state
- Content is loaded from markdown files in the `content/` directory
- Fallback content is provided for development

### File Structure
```
content/
├── hero/
│   └── hero.md
├── about/
│   └── about.md
├── services/
│   ├── architectural-design.md
│   ├── interior-design.md
│   └── ...
├── projects/
│   ├── enscape.md
│   ├── urban-office.md
│   └── ...
├── gallery/
│   ├── design-1.md
│   ├── design-2.md
│   └── ...
└── footer/
    └── footer.md

public/
├── admin/
│   ├── config.yml
│   └── index.html
└── images/
    └── [all uploaded images]
```

### CMS Configuration
The CMS is configured in `public/admin/config.yml` with:
- Git Gateway backend
- Media folder configuration
- Collection definitions for each content type
- Field definitions with proper widgets

## 🎯 Usage Examples

### Adding a New Service
1. Go to `/admin` → Services
2. Click "New Service"
3. Fill in Title and Description
4. Save - a new markdown file will be created

### Adding a New Project
1. Go to `/admin` → Projects
2. Click "New Project"
3. Fill in all fields (Title, Category, Year, Image, Description)
4. Set Featured status if needed
5. Save - a new markdown file will be created

### Updating Hero Section
1. Go to `/admin` → Hero Section
2. Edit the existing hero.md file
3. Update Title, Subtitle, or Background Image
4. Save - changes will be reflected immediately

## 🚨 Important Notes

1. **Authentication**: Make sure to set up Netlify Identity and Git Gateway for production
2. **Image Optimization**: Images are automatically optimized by Netlify
3. **Content Backup**: All content is stored in your Git repository
4. **Development vs Production**: Content files work in both development and production
5. **Fallback Content**: The app includes fallback content for development

## 🔍 Troubleshooting

### CMS Not Loading
- Check that `public/admin/config.yml` exists
- Verify Git Gateway is enabled in Netlify
- Check browser console for errors

### Images Not Displaying
- Ensure images are uploaded to `public/images/`
- Check image paths in markdown files
- Verify image files exist in the repository

### Content Not Updating
- Check that markdown files are properly formatted
- Verify content is saved in the CMS
- Check React app console for loading errors

## 📞 Support

For issues with the CMS integration:
1. Check the Netlify CMS documentation
2. Verify your Netlify Identity setup
3. Check the browser console for errors
4. Ensure all required fields are filled in the CMS
