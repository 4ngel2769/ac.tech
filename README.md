<div align="center">
    <h1>angeldev0's portfolio website 🚀</h1>
    <br/>
    <p><b>A modern, responsive personal website and cybersecurity portfolio built with Nuxt.js 4, showcasing projects, skills, and technical expertise.</b></p>
    <br/>
    <hr/>
    <p>Technologies Used:</p>
    <img src="https://skillicons.dev/icons?i=nuxt,vue,npm,nodejs,tailwind,ts,docker,nginx" alt="technologies used" />
</div>


## 🌟 Live Website

Visit the live site at: **[angellabs.xyz](https://angellabs.xyz)**

## 📋 Prerequisites

### For Local Development
- [Node.js](https://nodejs.org) (v22.17.1 recommended)
- [Git](https://git-scm.com)
- Your favorite package manager (npm, yarn, pnpm, or bun)

### For Docker Deployment
- [Docker](https://www.docker.com/get-started) (20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+) (optional)

## 🚀 Quick Start

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

## 🐳 Docker Deployment

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

The Dockerfile uses a **multi-stage build** for optimal performance:

- **Stage 1 (Builder)**: Uses Node.js 22 Alpine to build the static site with `npm run generate`
- **Stage 2 (Production)**: Uses nginx Alpine to serve the generated files

**Benefits:**
- **Small image size** (~25MB final image)
- **Fast builds** with layer caching
- **Secure** with minimal attack surface
- **Production-ready** nginx configuration with:
  - Static asset caching
  - Gzip compression
  - Security headers
  - Health checks

## ✨ Current Features

### 🏠 Homepage
- **Hero Section**: Interactive video/image background with personal introduction
- **Projects Showcase**: Featured projects with dynamic content loading
- **Latest Blog Posts**: Recent articles and technical writings
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Glassmorphism effects, smooth animations, and intuitive navigation

### 📂 Projects Portfolio
- **Dynamic Project Listing**: Filterable and searchable project grid
- **Fuzzy Search**: Powered by Fuse.js for intelligent content discovery
- **Project Categories**: Organized by tags and technologies
- **Detailed Project Pages**: Individual pages with rich content, images, and metadata
- **Infinite Scroll**: Smooth pagination with lazy loading
- **Breadcrumb Navigation**: Clear site hierarchy and navigation

### 📝 Blog System
- **SEO Optimized**: Rich meta tags and structured data
- **Markdown Content**: Full MDX support with custom components
- **Syntax Highlighting**: Code blocks with Nord theme
- **Table of Contents**: Auto-generated navigation for long articles
- **Social Sharing**: Built-in sharing buttons for social platforms
- **Related Articles**: Smart content recommendations

### 🎨 Design & UI
- **Dark/Light Mode**: Toggle between themes (currently dark-focused) **[`WIP`]**
- **Custom Typography**: Multiple font families including Montserrat, Sen, and custom fonts
- **Responsive Grid**: CSS Grid and Flexbox layouts
- **Loading States**: Elegant loading indicator

### 🔧 Technical Features
- **SSR/SSG**: Server-side rendering with static generation support
- **SEO Optimized**: Meta tags, Open Graph
- **Performance**: Optimized images and lazy loading
- **Sitemap & Robots**: Automated SEO file generation
- **Error Handling**: Custom 404 pages and graceful error recovery

## 🛠️ Technology Stack

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

## 📁 Project Structure

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

## Current Status & Roadmap

### ✅ Completed Features
- [x] Modern homepage with hero section
- [x] Responsive design across all devices
- [x] Projects portfolio with search and filtering
- [x] Individual project pages with rich content
- [x] Blog system with markdown support
- [x] SEO optimization and meta tags
- [x] Dark/Light theme implementation
- [x] Search functionality enhancement
- [x] Blog content expansion

### 🚧 In Progress
- [ ] Resume/CV page
- [ ] Contact form functionality
- [ ] Light theme refinement
- [ ] Social media integration
- [ ] Performance optimization

### 🔮 Future Plans
- [ ] Newsletter subscription
- [ ] Comments system
- [ ] Multi-language support
- [ ] PWA features

## 🌐 About

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

## 📞 Contact

- **LinkedIn**: [Angel Capra](https://www.linkedin.com/in/angelcapra)
- **Twitter**: [@angeldev0](https://twitter.com/angeldev0)

## 📄 License

<div align="center">
    This project is open source and available under the <a href="LICENSE">MIT License</a>.<br/>
    <!-- <hr /> -->
    <b>Built with ❤️ and 🐛 by angeldev0</b>
</div>