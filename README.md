# Dutts.Project - Konveksi & Makloon (Full Production)

This is the official landing page and profile website for **Dutts.Project**, a professional apparel manufacturing and custom clothing partner.

## 🚀 Quick Start

This project is built using **React (Vite)** and **Tailwind CSS**.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Navigate into the directory:
   ```bash
   cd dutts-project
   ```
3. Install dependencies (using npm, yarn, or pnpm):
   ```bash
   npm install
   ```

### Running for Development

To start the local development server:
```bash
npm run dev
```
Open your browser and visit `http://localhost:3000` (or whichever port Vite provides in the console).

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled files will be located in the `dist` folder. You can deploy this folder to any static hosting service like Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

## 🛠 Tech Stack

- **Framework:** React (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **Animations:** Motion (formerly Framer Motion)
- **Icons:** Lucide React

## 📁 Project Structure

- `/public/frames`: Static images sequence used for the scroll-driven video background.
- `/src/components`: UI components (Navbar, HeroSection, CostEstimatorModal, etc.).
- `/src/data/content.ts`: The main data file. Edit this file to easily update texts, contact information, packages, and FAQ without touching the UI code.
- `/src/index.css`: Global styles, CSS animations, and theme colors configuration (Brand blue, yellow, etc.).
- `/src/App.tsx`: Main application entry point that stitches all sections together.

## 💡 How to Customize Colors

The brand colors are configured using standard CSS variables at the top of `/src/index.css`:

```css
@theme {
  --color-brand-blue: #6A7BFF;
  --color-brand-yellow: #FFE055;
  --color-brand-dark: #161825;
  --color-brand-darker: #0d0f17;
}
```
Modify these hex codes to universally change the accent colors across the website.
