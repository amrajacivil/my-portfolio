# Arumugam Maharaja — Portfolio Website

A static portfolio website for Arumugam Maharaja — experienced Python and Go backend developer with cloud & AI focus.

## 📁 Project Structure

```
my-portfolio/
├── assets/
│   ├── css/
│   │   ├── style.css          # Main styles
│   │   ├── responsive.css     # Responsive/mobile styles
│   │   └── blog.css           # Blog post page styles
│   ├── fonts/
│   │   └── fonts.css          # Google Fonts import
│   └── js/
│       ├── main.js            # Main JavaScript (menu, scroll, animations)
│       └── smooth-scroll.js   # Smooth scroll for anchor links
├── pages/
│   ├── blog/
│   │   └── unlocking-relationships-in-oil-gas-data-with-graph-databases.html
│   └── contact.html
├── index.html                 # Main portfolio page
└── README.md
```

## 🚀 Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser
3. No build tools or dependencies required — it's pure HTML, CSS, and JavaScript

### Local Development Server (optional)

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then open `http://localhost:8000` in your browser.

## ✨ Features

- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Theme** — Modern dark color scheme with accent colors
- **Smooth Animations** — Fade-in effects on scroll using Intersection Observer
- **Mobile Navigation** — Hamburger menu for mobile devices
- **Typing Effect** — Animated text in the hero section
- **Blog Support** — Dedicated blog post pages with rich content styling
- **Contact Form** — Mailto-based contact form
- **Scroll to Top** — Floating button for easy navigation
- **SEO Friendly** — Meta tags and semantic HTML

## 🎨 Customization

- **Colors:** Edit CSS variables in `:root` in `assets/css/style.css`
- **Content:** Edit the HTML directly in `index.html`
- **Images:** Replace the image URLs with your own photos
- **Social Links:** Update the LinkedIn, GitHub, and other links

## 📝 Adding Blog Posts

1. Create a new HTML file in `pages/blog/`
2. Use the existing blog post as a template
3. Add a card in the blog section of `index.html`

## 📄 License

© 2025 Arumugam Maharaja. All rights reserved.