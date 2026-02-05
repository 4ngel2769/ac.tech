<div align="center">
    <!-- <h1>my </h1> -->
    <!-- <br/> -->
    <h2>A modern and responsive portfolio built with Nuxt 4, showcasing projects, skills, blogs, and practical experience.</h2>
    <img src=".github/readmesrc/nR94oAy.gif" alt="https://angellabs.xyz website preview" />
    <br/>
    <h3>Tech stack used</h3>
    <img src="https://skillicons.dev/icons?i=nuxt,vue,tailwind,ts,docker,nginx" alt="technologies used" />
    <h1 align="center" style="color:#00ff00; font-family:monospace;"></h1>
    <p>Live at: <a href="https://angellabs.xyz">angellabs.xyz</a></p>
</div>

## Prerequisites

### For Local Development
- [Node.js](https://nodejs.org) (v22.17.1 recommended)
- [Git](https://git-scm.com)
- Your favorite package manager (npm, yarn, pnpm, or bun)

### For Docker Deployment
- [Docker](https://www.docker.com/get-started) (20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+) (optional)

## Quick Start

### Installation

Clone the repository:
```bash
git clone https://github.com/4ngel2769/ac.tech.git
cd ac.tech
```

Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun (experimental)
bun install
```

### Development

Start the development server with hot reload:
```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun (experimental)
bun run dev
```

The development server will start on `http://localhost:3000` and automatically open in your default browser.

### Production

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Generate static site:
```bash
npm run generate
```

## Docker Deployment

### Quick Start with Docker Compose (Recommended)

The easiest way to run the website is using Docker Compose:

```bash
# Build and start the container
docker compose up -d --build

# View logs
docker compose logs -f

# Stop the container
docker compose down
```

The website will be available at `http://localhost:3000`

### Manual Docker Build

If you prefer to use Docker directly:

```bash
# Build the image
docker build -t ac-tech .

# Run the container
docker run -d -p 3000:80 --name ac-tech ac-tech

# View logs
docker logs -f ac-tech

# Stop and remove container
docker stop ac-tech && docker rm ac-tech
```

### Deploying to Coolify

[Coolify](https://coolify.io) is a self-hosted platform that makes deployment simple:

1. [Connect your repository to Coolify](https://coolify.io/docs/knowledge-base/git/github/integration)
2. Select "Dockerfile" as the build pack (Coolify will auto-detect the Dockerfile)
3. Configure environment (optional, if you have env variables)
4. Click Deploy 🚀

Coolify will automatically:
- Build your Docker image
- Deploy the container
- Set up SSL certificates
- Provide a public URL

### Deploying to Linux Servers

For manual deployment on any Linux server with Docker installed:

```bash
# Clone the repository
git clone https://github.com/4ngel2769/ac.tech.git
cd ac.tech

# Build the Docker image
docker build -t ac-tech .

# Run the container on port 80
docker run -d \
  -p 80:80 \
  --name ac-tech \
  --restart unless-stopped \
  ac-tech

# Optional: Set up with nginx reverse proxy
# Create nginx config at /etc/nginx/sites-available/ac-tech
# Point it to http://localhost:80
```

### Docker Architecture

The Dockerfile uses a multi-stage build for optimal performance:

- **Stage 1 (Builder)**: Uses Node.js 22 Alpine to build the static site with `npm run generate`
- **Stage 2 (Production)**: Uses nginx Alpine to serve the generated files

**Benefits:**
- Small image size (~25MB final image)
- Fast builds with layer caching
- Secure with minimal attack surface
- Production-ready nginx configuration with static asset caching, gzip compression, security headers, and health checks

## Features

### Homepage
- Hero section with interactive video/image background
- Projects showcase with dynamic content loading
- Latest blog posts display
- Responsive design for all devices
- Modern UI with glassmorphism effects and smooth animations

### Projects Portfolio
- Dynamic project listing with search and filtering
- Fuzzy search powered by Fuse.js
- Project categories and tags
- Detailed project pages with rich content
- Infinite scroll pagination
- Breadcrumb navigation

### Blog System
- SEO optimized with rich meta tags
- Markdown content with MDX support
- Syntax highlighting with Nord theme
- Auto-generated table of contents
- Social sharing buttons
- Related articles recommendations

### Design & UI
- Dark/Light mode toggle (currently dark-focused)
- Custom typography with multiple font families
- Responsive grid layouts
- Loading states and animations

### Technical Features
- SSR/SSG with static generation support
- SEO optimization with meta tags and Open Graph
- Optimized images and lazy loading
- Automated sitemap and robots.txt generation
- Custom 404 pages and error handling

## Technology Stack

### Core Framework
- **[Nuxt.js 4](https://nuxt.com)**: Vue.js framework with SSR/SSG
- **[Vue](https://vuejs.org)**: Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org)**: Type-safe development

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com)**: Utility-first CSS framework
- **[Nuxt UI](https://ui.nuxt.com)**: Vue component library
- **[Font Awesome](https://fontawesome.com)**: Icon library
- **Custom Fonts**: Extensive font collection for unique typography

### Content Management
- **[Nuxt Content](https://content.nuxtjs.org)**: File-based CMS with MDX support
- **[Fuse.js](https://fusejs.io)**: Fuzzy search library

### Utilities & Enhancements
- **[@vueuse/core](https://vueuse.org)**: Vue composition utilities
- **[@formkit/auto-animate](https://auto-animate.formkit.com)**: Smooth animations
- **[Sass](https://sass-lang.com)**: CSS preprocessor

### SEO & Analytics
- **[@nuxtjs/seo](https://nuxtseo.com)**: SEO optimization tools
- **[@nuxtjs/sitemap](https://sitemap.nuxtjs.org)**: Automatic sitemap generation
- **[nuxt-gtag](https://github.com/johannschopplich/nuxt-gtag)**: Google Analytics

## Project Structure

```
ac.tech/
├── app/
│   ├── components/          # Vue components
│   │   ├── blog/           # Blog-specific components
│   │   ├── content/        # MDX content components
│   │   ├── icons/          # Custom icon components
│   │   ├── nav/            # Navigation components
│   │   └── sections/       # Section components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   │   ├── projects/       # Project pages and listing
│   │   └── ...
│   └── assets/             # Static assets
│       ├── css/           # Stylesheets
│       └── fonts/         # Custom fonts
├── content/                # Markdown content
│   ├── projects/          # Project articles
│   └── authors/           # Author information
├── public/                 # Public static files
├── nuxt.config.ts         # Nuxt configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies and scripts
```

## Status

### Completed Features
- Modern homepage with hero section
- Responsive design across all devices
- Projects portfolio with search and filtering
- Individual project pages with rich content
- Blog system with markdown support
- SEO optimization and meta tags
- Dark/Light theme implementation
- Search functionality enhancement
- Blog content expansion

### In Progress
- Resume/CV page
- Contact form functionality
- Light theme refinement
- Social media integration
- Performance optimization

### Future Plans
- Newsletter subscription
- Comments system
- Multi-language support
- PWA features

## About

This website serves as my digital portfolio, showcasing expertise in:

- **Cybersecurity**: Ethical hacking, security research, and vulnerability assessment
- **Embedded Development**: ESP32, Arduino, and IoT projects
- **Web Development**: Modern JavaScript frameworks and full-stack development
- **Technical Writing**: Documentation, tutorials, and technical blog posts

## 🤝 Contributing

While this is a personal website, suggestions and bug reports are welcome! Feel free to:

1. Open an issue for bugs or feature requests
2. Submit pull requests for improvements
3. Share feedback on design or functionality

## Contact

- **Email**: [angeldevz0 [@] proton [.] me](mailto:angeldevz0@proton.me)
- **Twitter**: [@angeldev0](https://twitter.com/angeldev0)

## License

<div align="center">
    This project is open source and available under the <a href="LICENSE">MIT License</a>.<br/>
    <!-- <hr /> -->
    <b>Built with ❤️ and 🐛 by angeldev0</b>
</div>
