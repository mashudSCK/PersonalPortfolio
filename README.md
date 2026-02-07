# Personal Portfolio Website

A modern, responsive personal portfolio website featuring a minimal card-based dashboard design with subtle interactive elements. Built with vanilla HTML, CSS, and JavaScript for maximum performance and maintainability.

![Portfolio Preview](images/preview.png)

## ✨ Features

- **Responsive Design** - Fully responsive layout for desktop, tablet, and mobile devices
- **Modern Card-Based UI** - Clean, professional design with soft shadows and rounded corners
- **Interactive Elements** - Hover effects, animated skill bars, card tilt effects
- **Smooth Animations** - Scroll-triggered animations and transitions
- **Mobile Navigation** - Hamburger menu with smooth transitions
- **Contact Form** - Interactive form with validation and submission feedback
- **Fun Fact Rotator** - Click to cycle through fun facts
- **SEO Friendly** - Semantic HTML structure
- **Fast Loading** - No frameworks, just vanilla HTML/CSS/JS

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)
- Optional: Live Server extension for VS Code

### Running Locally

#### Option 1: Using VS Code Live Server (Recommended)

1. Open the project folder in VS Code
2. Install the "Live Server" extension if you haven't already
3. Right-click on `index.html` and select "Open with Live Server"
4. Your browser will open automatically at `http://127.0.0.1:5500`

#### Option 2: Using Python

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

#### Option 3: Using Node.js

```bash
# Install serve globally
npm install -g serve

# Run the server
serve .

# Open the URL shown in terminal
```

#### Option 4: Direct File Opening

Simply double-click `index.html` to open it directly in your browser. Note: Some features may not work properly due to CORS restrictions.

## 📁 Project Structure

```
PersonalPortfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── resume.pdf          # Your resume (add your own)
```

## 🎨 Customization Guide

### Changing Personal Information

Open `index.html` and update the following sections:

#### 1. Hero Section (Lines 31-56)
```html
<h1 class="hero-name">Your Name</h1>
<p class="hero-tagline">Your Title / Tagline</p>
<p class="hero-intro">Your introduction text...</p>
```

#### 2. Profile Photo
Replace the image URL in the hero section:
```html
<img src="YOUR_PHOTO_URL" alt="Your Name - Profile Photo" class="hero-image">
```

#### 3. About Me Section (Lines 66-120)
Update the biography, approach, and hobbies sections with your own content.

#### 4. Projects Section (Lines 124-250)
Each project card follows this structure:
```html
<article class="project-card" data-tilt>
    <div class="project-image-wrapper">
        <img src="PROJECT_IMAGE_URL" alt="Project Name" class="project-image">
        <div class="project-overlay">
            <div class="project-links">
                <a href="GITHUB_URL" target="_blank" rel="noopener noreferrer" class="project-link">
                    <!-- GitHub icon -->
                </a>
                <a href="LIVE_DEMO_URL" target="_blank" rel="noopener noreferrer" class="project-link">
                    <!-- External link icon -->
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
        <div class="project-meta">
            <span class="project-role">Your Role</span>
        </div>
        <details class="project-story">
            <summary>Why I built this</summary>
            <p>Your story...</p>
        </details>
    </div>
</article>
```

#### 5. Skills Section (Lines 254-340)
Update skill names and percentages:
```html
<div class="skill-item">
    <div class="skill-info">
        <span class="skill-name">Skill Name</span>
        <span class="skill-level">85%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="85"></div>
    </div>
</div>
```

#### 6. Achievements Section (Lines 344-395)
Update achievements, certifications, and awards.

#### 7. Contact Section (Lines 399-480)
Update email and social media links:
```html
<a href="mailto:your@email.com" class="contact-method">
    <!-- Email content -->
</a>
```

### Changing Colors

Open `styles.css` and modify the CSS custom properties at the top:

```css
:root {
    /* Main accent color - change this for a different theme */
    --color-accent: #6366f1;        /* Main accent (purple-blue) */
    --color-accent-light: #818cf8;  /* Lighter shade */
    --color-accent-dark: #4f46e5;   /* Darker shade */
    
    /* Background colors */
    --color-bg: #f8f9fa;            /* Main background */
    --color-bg-alt: #eef1f5;        /* Alternative background */
    --color-card: #ffffff;          /* Card background */
    
    /* Text colors */
    --color-text: #1a1a2e;          /* Primary text */
    --color-text-secondary: #64748b; /* Secondary text */
}
```

#### Popular Color Schemes

**Ocean Blue:**
```css
--color-accent: #0ea5e9;
--color-accent-light: #38bdf8;
--color-accent-dark: #0284c7;
```

**Emerald Green:**
```css
--color-accent: #10b981;
--color-accent-light: #34d399;
--color-accent-dark: #059669;
```

**Rose Pink:**
```css
--color-accent: #f43f5e;
--color-accent-light: #fb7185;
--color-accent-dark: #e11d48;
```

**Amber Orange:**
```css
--color-accent: #f59e0b;
--color-accent-light: #fbbf24;
--color-accent-dark: #d97706;
```

### Adding Fun Facts

Open `script.js` and update the `funFacts` array (around line 130):

```javascript
const funFacts = [
    "Fun fact: Your fact here! 🎉",
    "Another fun fact! 🚀",
    // Add more facts...
];
```

### Adding Your Resume

1. Place your resume PDF in the project root folder
2. Name it `resume.pdf` (or update the link in `index.html`)

## 🔧 Technical Details

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Features

- CSS Grid and Flexbox for layouts
- CSS Custom Properties for theming
- Intersection Observer for scroll animations
- Debounced/throttled scroll handlers
- No external dependencies

### Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast
- Skip links can be added if needed

## 📝 Making the Contact Form Work

The contact form is currently set up with a simulated submission. To make it actually send emails, you have several options:

### Option 1: Formspree (Easiest)

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form
3. Update the form action in `index.html`:
```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms

If hosting on Netlify, add the `netlify` attribute:
```html
<form class="contact-form" id="contactForm" netlify>
```

### Option 3: Custom Backend

Set up your own API endpoint and update the `handleFormSubmit` function in `script.js`.

## 🌐 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select the main branch and root folder
4. Your site will be live at `https://username.github.io/repository-name`

### Netlify

1. Connect your GitHub repository to Netlify
2. Deploy with default settings
3. Your site will be live with a Netlify URL (or custom domain)

### Vercel

1. Import your repository to Vercel
2. Deploy with default settings
3. Your site will be live with a Vercel URL (or custom domain)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- Fonts: [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- Icons: Hand-crafted SVG icons
- Images: [Unsplash](https://unsplash.com) (placeholder images)

---

Made with ❤️ by [Your Name]

**Need help?** Feel free to open an issue or reach out!
