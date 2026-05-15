# 🛡️ Rakesh Ranjan Pradhan - Security Engineer Portfolio

A high-end, interactive portfolio website designed for a Security Engineer, featuring a "Cyber Defense" theme with advanced animations, 3D effects, and terminal-style interfaces.

![Portfolio Preview](public/hacker.svg)

## 🚀 Features

- **Cybersecurity Aesthetic**: "Hacker" theme with **Cyber Green (#00ff41)** accents, terminal-style typography, and glitch effects.
- **3D Visuals**: Interactive **Three.js** background featuring a matrix-style particle field and a 3D cube page loader.
- **Smooth Animations**: Powered by **GSAP (GreenSock)** for scroll-triggered text reveals, parallax effects, and hover interactions.
- **Premium Scrolling**: Implemented using **Lenis** for a smooth, inertial scrolling experience with a custom progress bar.
- **Responsive Design**: Fully optimized for all devices, featuring a custom "Terminal" slide-out menu for mobile.
- **Interactive Contact**: "Secure Transmission" contact modal integrated with **Formspree** for real-time email delivery.

## 🛠️ Tech Stack

- **Core**: HTML5, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **3D & Animation**:
  - [Three.js](https://threejs.org/) (WebGL Backgrounds)
  - [GSAP](https://greensock.com/gsap/) (ScrollTrigger & Animations)
  - [Lenis](https://lenis.studio/) (Smooth Scrolling)
- **Icons**: Boxicons

## 💻 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rakeshranjan25/rakeshranjan25.github.io.git
   cd rakeshranjan25.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌍 Deployment

This project is configured to deploy automatically to **GitHub Pages** using GitHub Actions.

1. Push changes to the `main` branch.
2. The GitHub Action (configured in `.github/workflows/deploy.yml`) will automatically build the project.
3. The build artifacts are pushed to the `gh-pages` branch.
4. **Note**: Ensure your GitHub repository settings are configured to serve GitHub Pages from the `gh-pages` branch.

## 📂 Project Structure

```
├── index.html          # Main entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── public/             # Static assets (favicons, images)
└── src/
    ├── main.js         # Main JavaScript logic (Three.js, GSAP, Lenis)
    ├── style.css       # Global styles and Tailwind directives
    └── pdf/            # Resume files
```

## 📬 Contact

- **LinkedIn**: [Rakesh Ranjan Pradhan](https://www.linkedin.com/in/rakeshranjan25/)
- **GitHub**: [rakeshranjan25](https://github.com/rakeshranjan25)
- **Instagram**: [@ig_rakeshranjan](https://www.instagram.com/ig_rakeshranjan/)

---
&copy; 2025 Rakesh Ranjan Pradhan. All Rights Reserved.
