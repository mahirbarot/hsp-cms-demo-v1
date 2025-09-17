# H S Planning Ltd. - Architecture Portfolio Website

A modern, responsive React website for H S Planning Ltd., an architecture and interior design firm.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern React Architecture**: Component-based structure with hooks
- **Interactive Gallery**: Image slider with Slick Carousel
- **Smooth Animations**: Intersection Observer API for scroll animations
- **Contact Integration**: WhatsApp integration for form submissions
- **SEO Optimized**: Semantic HTML and meta tags

## Technologies Used

- React 18
- Tailwind CSS
- React Slick (Carousel)
- Intersection Observer API
- HTML5 & CSS3

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hs-planning-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation component
│   ├── Hero.js            # Hero section
│   ├── About.js           # About section
│   ├── Services.js        # Services section
│   ├── Projects.js        # Projects showcase
│   ├── Gallery.js         # Image gallery
│   ├── Careers.js         # Careers section
│   ├── Contact.js         # Contact form
│   └── Footer.js          # Footer
├── assets/                # Images and static assets
├── App.js                 # Main app component
├── index.js               # React entry point
└── index.css              # Global styles
```

## Customization

### Adding New Projects

Edit the `projects` array in `src/components/Projects.js`:

```javascript
const projects = [
  {
    id: 5,
    title: "New Project",
    category: "Residential",
    year: "2024",
    image: "./assets/new-project.jpg",
    description: "Project description"
  }
];
```

### Updating Services

Modify the `services` array in `src/components/Services.js`:

```javascript
const services = [
  {
    title: "New Service",
    description: "Service description"
  }
];
```

### Changing Contact Information

Update the contact details in `src/components/Contact.js` and `src/components/Footer.js`.

### Styling

The project uses Tailwind CSS. You can:
- Modify `tailwind.config.js` for custom theme settings
- Update `src/index.css` for global styles
- Add custom classes to components

## Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
3. Deploy: `npm run deploy`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 H S Planning Ltd. All rights reserved.
