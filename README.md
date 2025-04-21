# Juan Francisco Marcenaro A. - Full-Stack Developer Portfolio 🚀

Welcome to the repository for my personal portfolio website! This project showcases my skills and the projects I've completed, particularly during my Full-Stack Web Development program at CareerFoundry. It's built using modern web technologies with a focus on a clean, professional, and slick user experience.

**✨ Live Demo:** [**(https://jf-web.vercel.app//)**]([YOUR_VERCEL_DEPLOYMENT_URL]) _(Please update this link after deployment)_

## 📜 Project Overview

This single-page application serves as a dynamic digital resume and project showcase. It features:

*   A visually engaging **Hero Section** with a looping video background and integrated profile information.
*   Detailed **Project Showcase** section displaying work with descriptions, tech stacks, and links.
*   An **About Me** section detailing my background in web development and sound engineering.
*   A structured **Workflow Section** outlining my development process.
*   Clear **Contact** information.
*   An ambient **Background Audio Player** with floating controls.
*   Subtle **Animations** and smooth scrolling for an enhanced user experience.
*   **Responsive Design** adapting seamlessly across all devices.
*   **Dark Mode** support based on system preferences.

This portfolio fulfills the final project requirements for CareerFoundry's Achievement 6 (Exercise 6.6).

## ✨ Features

*   **Dynamic Hero Section:** Full-height section with cycling background videos (dev-adjustable opacity/brightness).
*   **Interactive Project Cards:** Grid display of projects with hover effects (zoom, shadow, lift), line-clamped descriptions, tech stack badges, and links to GitHub/Live Demos/Video.
*   **Animated Content:** Smooth fade-in animations on scroll for sections and project cards using Framer Motion.
*   **Smooth Scrolling Navigation:** Fixed header with links that smoothly scroll to corresponding page sections.
*   **Responsive Mobile Menu:** Functional hamburger menu for navigation on smaller screens.
*   **Workflow Visualization:** Horizontal scrolling/grid display outlining the development lifecycle stages.
*   **Skills Display:** Structured presentation of technical skills in the "About Me" section.
*   **Ambient Audio Player:** Optional background audio with fixed toggle button and floating controls for play/pause, mute, and volume.
*   **Modern Styling:** Built with Tailwind CSS for a professional, clean, and responsive UI, including dark mode support.
*   **Optimized Images:** Uses `next/image` for optimized loading and display of profile picture and project visuals.

## 🛠️ Tech Stack

*   **Framework:** Next.js (v14+ with App Router)
*   **Language:** TypeScript
*   **UI Library:** React
*   **Styling:** Tailwind CSS
*   **Animation:** Framer Motion
*   **Deployment:** Vercel

## 🚀 Getting Started

**Prerequisites:**

*   Node.js (LTS version recommended)
*   npm or yarn

**Installation & Running Locally:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jf8989/jf-web
    cd <repository-folder-name>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Prepare Assets:**
    *   Place your profile picture in `/public/images/`.
    *   Place your project screenshots in `/public/images/` (or update paths in `src/data/projects.ts`).
    *   Place your background videos in `/public/videos/` (or update paths in `src/components/HeroSection.tsx`).
    *   Place your background audio track in `/public/audio/` (or update path in `src/components/AudioPlayer.tsx`).
    *   Place your favicon files in `/public/`.
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

## ☁️ Deployment

This project is configured for easy deployment to [Vercel](https://vercel.com/). Connect your GitHub repository to Vercel for automatic deployments on push/merge to the main branch.

## 👨‍💻 Author

**Juan Francisco Marcenaro A.**

*   **LinkedIn:** [https://www.linkedin.com/in/jfmarcenaroa/](https://www.linkedin.com/in/jfmarcenaroa/)
*   **GitHub:** [https://github.com/jf8989](https://github.com/jf8989)

## 📄 License

This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/).

**You are free to:**

*   **Share** — copy and redistribute the material in any medium or format for non-commercial purposes only.

**Under the following terms:**

*   **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
*   **NonCommercial** — You may not use the material for commercial purposes.
*   **NoDerivatives** — If you remix, transform, or build upon the material, you may not distribute the modified material. This means you cannot use this code as a template or base for your own website.

This license allows for viewing the code for educational purposes but restricts its reuse in other projects or websites.

---

*Feel free to explore the code and reach out if you have any questions!*