# 🚀 Amro Massalha - DevOps Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?style=for-the-badge&logo=github" alt="GitHub Pages" />
</div>

<div align="center">
  <h3>🌟 From QA to Cloud Infrastructure Hero</h3>
  <p>An interactive terminal-based portfolio showcasing 8+ years of DevOps excellence</p>
  <p>
    <a href="https://amromassalha.github.io/portfolio">👁️ View Live Portfolio</a> •
    <a href="https://linkedin.com/in/amro-massalha">💼 LinkedIn</a> •
    <a href="mailto:amr.massalha@gmail.com">📧 Contact</a>
  </p>
</div>

---

## 🎯 What Makes This Portfolio Special

This isn't your typical portfolio - it's an **interactive terminal experience** that reflects my DevOps journey. Type commands, explore projects, and discover how I transform infrastructure challenges into scalable solutions.

### ✨ Key Features

- **🖥️ Interactive Terminal** - A fully functional terminal emulator showcasing my DevOps mindset
- **🎨 Modern Design** - Sleek, professional UI with playful touches (try the `joke` command!)
- **📊 Real Metrics** - Actual impact numbers from my career (70% cost savings, $10k/week CI optimization)
- **🌳 Personal Touch** - Discover my life beyond code with the `life` command
- **📱 Fully Responsive** - Beautiful on all devices, from mobile to 4K screens
- **⚡ Lightning Fast** - Optimized performance with Next.js 15 and static generation

## 🛠️ Tech Stack

```yaml
Frontend:
  - Next.js 15.3.4 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS 4
  - Framer Motion

Deployment:
  - GitHub Pages
  - GitHub Actions (CI/CD)
  - Custom deploy script with .nojekyll support

Tools & Libraries:
  - Lucide React (icons)
  - ESLint & TypeScript (code quality)
  - PostCSS (styling)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/AmroMassalha/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run deploy   # Deploy to GitHub Pages
```

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main portfolio component
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles
├── public/                # Static assets
│   └── resume.pdf         # Resume (add your PDF here)
├── .github/
│   └── workflows/         # GitHub Actions (optional)
├── deploy.sh             # Custom deployment script
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🎮 Terminal Commands

Once you're in the portfolio, try these commands in the terminal:

| Command    | Description                              |
| ---------- | ---------------------------------------- |
| `help`     | Show all available commands              |
| `about`    | Learn about my journey from QA to DevOps |
| `skills`   | View my technical arsenal                |
| `projects` | Explore my featured projects             |
| `work`     | See my career progression                |
| `life`     | Discover my life beyond code 🌳          |
| `joke`     | DevOps humor (my personal favorites!)    |
| `coffee`   | Brew some virtual coffee ☕              |
| `ping`     | Check system status                      |
| `whoami`   | Complete system info                     |
| `clear`    | Clear the terminal                       |

## 🎨 Customization Guide

### 1. Update Personal Information

Edit `app/page.tsx` to update:

- Contact information
- Projects and achievements
- Skills and certifications
- Personal life details

### 2. Change Color Scheme

The portfolio uses a gradient theme. To customize:

```tsx
// In app/page.tsx, find:
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">

// Change to your preferred colors:
<div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-cyan-900">
```

### 3. Add Your Resume

Place your PDF resume in the `public` folder:

```bash
cp /path/to/your/resume.pdf public/resume.pdf
```

Then update the resume command in the code to trigger an actual download.

### 4. Add New Terminal Commands

```typescript
// Add to the commands object:
newcommand: () => ({
  output: [
    'Your custom output here',
    'Multiple lines supported'
  ]
}),
```

## 🚢 Deployment

This portfolio is configured for GitHub Pages deployment:

```bash
# Automatic deployment
npm run deploy

# Manual deployment
./deploy.sh
```

The deployment script:

- Builds the Next.js static site
- Adds `.nojekyll` file for proper routing
- Deploys to `gh-pages` branch

### Setting Up GitHub Pages

1. Go to your repository settings
2. Navigate to Pages section
3. Source: Deploy from branch
4. Branch: `gh-pages` / `root`
5. Save and wait for deployment

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: Optimized with Next.js automatic code splitting

## 🎉 Easter Eggs

There are several hidden features in the portfolio:

- Time-based greetings (try visiting at different times)
- Special Shabbat message on Friday evenings
- Random DevOps jokes (including family-themed ones!)
- Hover effects reveal additional information

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- My family - Noura, Zeina, and Lina - for their endless support
- The DevOps community for continuous learning
- Everyone who said "It works on my machine" - you inspired the jokes section

---

<div align="center">
  <p>Built with ❤️, lots of ☕, and occasionally maintained by 🚜</p>
  <p>
    <i>"I solve problems. Sometimes with code, sometimes with architecture, sometimes by just talking to people."</i>
  </p>
</div>
