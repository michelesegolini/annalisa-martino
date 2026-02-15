# AnnalisaMartino Portfolio Website

Premium portfolio website for Italian fashion designer Annalisa Martino, featuring a stunning VirtualGallery with video backgrounds, mobile-first design, and comprehensive SEO optimization.

## Features

- ✨ **VirtualGallery**: Horizontal snap-scroll gallery with video backgrounds
- 🎨 **Premium Design**: Material UI with elegant typography and glassmorphism effects
- 📱 **Mobile-First**: Fully responsive design optimized for all devices
- 🔍 **SEO Optimized**: Comprehensive meta-tags and structured data for search engines
- 💬 **Contact Modal**: Elegant inquiry form with validation
- 🎭 **Sanity.io CMS**: Integration ready for content management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material UI v5
- **CMS**: Sanity.io
- **Styling**: CSS Modules + Global CSS
- **Fonts**: Cormorant Garamond + Inter (Google Fonts)
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/annalisa-martino.git
cd annalisa-martino
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update `.env.local` with your Sanity project credentials (optional for development)

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
annalisa-martino/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with SEO
│   ├── page.tsx             # Homepage with VirtualGallery
│   └── api/
│       └── contact/         # Contact form API endpoint
├── components/
│   └── gallery/
│       ├── VirtualGallery.tsx    # Main gallery component
│       └── InquireModal.tsx      # Contact modal
├── lib/
│   ├── sanity/              # Sanity.io configuration
│   └── theme.ts             # Material UI theme
├── styles/
│   └── globals.css          # Global styles
├── types/
│   └── index.ts             # TypeScript types
└── public/                  # Static assets
\`\`\`

## Videos & Assets

The VirtualGallery uses video backgrounds. Place your video files in the \`public/videos/\` directory. Supported formats:
- MP4 (recommended)
- WebM
- OGG

Update the video URLs in \`lib/sanity/queries.ts\` or configure them in your Sanity CMS.

## SEO Configuration

The website is optimized for ranking as an "Italian Haute-Couture Designer" with:
- Comprehensive meta-tags
- Open Graph and Twitter Card support
- Structured data (Schema.org FashionDesigner)
- Sitemap generation
- Robots.txt

Update SEO settings in \`app/layout.tsx\`.

## Sanity.io Setup (Optional)

1. Create a new Sanity project at [sanity.io](https://www.sanity.io/)
2. Define schemas for gallery items
3. Update \`NEXT_PUBLIC_SANITY_PROJECT_ID\` in \`.env.local\`
4. Replace mock data calls with actual Sanity queries in \`lib/sanity/queries.ts\`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

Build the production bundle:
\`\`\`bash
npm run build
npm start
\`\`\`

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint

## Customization

### Colors & Typography

Customize the Material UI theme in \`lib/theme.ts\`:
- Color palette
- Typography (fonts, sizes, weights)
- Component styles

### Gallery Items

Update mock gallery data in \`lib/sanity/queries.ts\` or connect to Sanity CMS.

## License

© 2026 Annalisa Martino. All rights reserved.

## Support

For support, email info@annalisamartino.com
