# Xingcheng Zhou - Personal Academic Website

A fast, production-ready academic personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Fast Performance**: Built with Next.js 14 App Router for optimal performance
- **TypeScript**: Full type safety throughout the codebase
- **Tailwind CSS**: Modern styling with TUM blue theme
- **Dark Mode**: System-aware dark mode support
- **Responsive Design**: Mobile-first responsive layout
- **SEO Optimized**: OpenGraph, sitemap, and RSS feed support
- **Content Management**: JSON-based content files for easy updates

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Content**: JSON files for structured data, MDX for markdown content
- **Theming**: next-themes for dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd xingcheng.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── publications/      # Publications page
│   ├── projects/          # Projects page
│   ├── datasets/          # Datasets page
│   └── ...
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── hero.tsx           # Hero section
│   ├── navigation.tsx     # Navigation bar
│   └── ...
├── content/               # Content files
│   ├── config.json        # Site configuration
│   ├── publications.json  # Publications data
│   ├── projects.json      # Projects data
│   └── ...
├── lib/                   # Utility functions
│   ├── content.ts         # Content loading utilities
│   ├── rss.ts             # RSS feed generation
│   └── sitemap.ts         # Sitemap generation
└── public/                # Static assets
    ├── favicon.ico        # Favicon
    └── cv.pdf             # CV PDF
```

## Content Management

### Adding Publications

Edit `content/publications.json` to add new publications. Each publication should include:

- `id`: Unique identifier
- `title`: Publication title (use exact title from literature)
- `authors`: Array of author names
- `year`: Publication year
- `venue`: Publication venue
- `links`: Object with links (arxiv, code, project, etc.)
- `highlights`: Optional array of key highlights

### Adding Projects

Edit `content/projects.json` to add new projects. Each project should include:

- `id`: Unique identifier
- `title`: Project title
- `summary`: Brief description
- `links`: Object with relevant links
- `badges`: Array of badge labels

### Adding Datasets

Edit `content/datasets.json` to add new datasets. Each dataset should include:

- `id`: Unique identifier
- `title`: Dataset title
- `summary`: Brief description
- `scale`: Optional object with statistics
- `links`: Object with relevant links

## Customization

### Colors and Theme

The primary color (TUM blue) is defined in `tailwind.config.ts`:

```typescript
primary: {
  DEFAULT: "#0065BD", // TUM Blue
}
```

### Site Configuration

Edit `content/config.json` to update:

- Site title and description
- Author information
- Social links
- Contact information

## Building for Production

1. Build the static site:
```bash
npm run build
```

2. The static files will be in the `out/` directory.

3. For deployment, you can:
   - Deploy to Vercel (recommended for Next.js)
   - Deploy to GitHub Pages (using static export)
   - Deploy to any static hosting service

## Deployment

### GitHub Pages

The website is configured for automatic deployment to GitHub Pages.

#### Method 1: Using GitHub Actions (Automated)

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source

2. **Push code**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. GitHub Actions will automatically:
   - Install dependencies
   - Generate RSS and Sitemap
   - Build static site
   - Deploy to GitHub Pages

4. **Access website**: `https://<username>.github.io/xingcheng.github.io` or `https://xingcheng.github.io` (if repository is named `username.github.io`)

#### Method 2: Manual Deployment

1. Build static site:
```bash
npm run build
```

2. Push to `gh-pages` branch:
```bash
cd out
git init
git add .
git commit -m "Deploy"
git branch -M gh-pages
git remote add origin <your-repo-url>
git push -u origin gh-pages
```

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and deploy

## SEO and Analytics

- **OpenGraph**: Automatically generated from metadata
- **Sitemap**: Available at `/sitemap.xml`
- **RSS Feed**: Available at `/rss.xml`
- **Analytics**: Add your analytics service in `app/layout.tsx`

## Content Guidelines

- Avoid hyphens and parentheses in visible UI copy and headings
- Use "end to end" instead of "end-to-end"
- Retain exact titles for papers and datasets from literature
- Keep paragraphs short and scannable
- Use direct academic tone

## License

MIT

## Contact

For questions or issues, please contact [xingcheng.zhou@tum.de](mailto:xingcheng.zhou@tum.de)
