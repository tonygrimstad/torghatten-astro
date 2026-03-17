# Torghatten Maraton - Developer Guide

**Quick navigation:** [Quick Start](#-quick-start) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure) · [i18n](#-internationalization-i18n) · [Components](#-component-architecture) · [Development Tools](#-development-tools) · [Deployment](#-deployment) · [Related Docs](#-related-documentation)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** (comes with Node.js)

### Installation

```bash
# Clone repository
git clone https://github.com/tonygrimstad/torghatten-astro.git
cd torghatten-astro

# Install dependencies
npm install
```

### Local Development

```bash
# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Astro** | 5.9.1 | Static Site Generator |
| **Tailwind CSS** | 4.1.4 | Utility-first CSS framework |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **Custom i18n** | — | Norwegian/English translations |

**Key Dependencies:**
- `@anthropic-ai/sdk` - Claude AI integration for dev tools
- `photoswipe` - Lightbox gallery
- `sharp` - Image optimization

---

## 📁 Project Structure

```
torghatten-astro/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── docs/
│   ├── standards/              # Design system, a11y, typography, SEO, i18n
│   ├── development/            # This file, deployment guides
│   ├── content/                # Content guidelines
│   ├── adr/                    # Architecture Decision Records
│   └── ai-agents/              # AI agent configuration
├── public/
│   ├── images/                 # Static images (banner, logos, photos, sponsors)
│   ├── results/                # Race results PDFs
│   ├── scripts/                # Client-side scripts
│   └── *.html                  # Static pages (404, 500, maintenance)
├── scripts/
│   ├── claude-*.js             # AI-powered dev tools
│   ├── i18n-*.js               # Translation management
│   └── generate-favicons.js    # Favicon generation
├── src/
│   ├── assets/                 # Build-time optimized images
│   ├── components/             # Astro components
│   │   ├── *Page.astro         # Page components (business logic)
│   │   ├── *Section.astro      # Reusable sections
│   │   └── *.astro             # UI components
│   ├── config/                 # Site configuration
│   │   ├── siteConfig.ts       # Feature toggles, site settings
│   │   ├── navLinks.ts         # Navigation structure
│   │   ├── sponsors.ts         # Sponsor data
│   │   └── classGroups.ts      # Race age groups
│   ├── data/                   # Static data (gallery index, etc.)
│   ├── layouts/
│   │   └── Layout.astro        # Main layout with SEO
│   ├── pages/
│   │   ├── [lang]/             # Dynamic language routing (no, en)
│   │   ├── api/                # API endpoints
│   │   ├── admin/              # Admin pages
│   │   ├── index.astro         # Root redirect
│   │   └── 404.astro           # 404 page
│   ├── styles/                 # Global styles
│   ├── translations/
│   │   ├── no.json             # Norwegian translations
│   │   └── en.json             # English translations
│   ├── types/                  # TypeScript types
│   └── utils/
│       └── useTranslations.ts  # i18n utility
├── astro.config.mjs            # Astro configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── CHECKLIST.md                # Pre-deployment checklist
├── CONTRIBUTING.md             # Contribution guidelines
└── README.md                   # Project overview
```

---

## 🌍 Internationalization (i18n)

### Overview

Custom i18n system supporting **Norwegian (no)** and **English (en)** through:
- Dynamic routing: `[lang]` directory
- Translation files: `src/translations/{no,en}.json`
- Utility: `useTranslations.ts`

### Architecture

```
URL: /no/helmaraton
  ↓
src/pages/[lang]/helmaraton.astro (Route wrapper)
  ↓
src/components/HelmaratonPage.astro (Page component with translations)
```

**Route Layer** (`src/pages/[lang]/*.astro`):
- Lightweight wrapper
- Generates static paths for both languages
- Validates language parameter

**Component Layer** (`src/components/*Page.astro`):
- Business logic
- Translation integration
- SEO metadata

### Usage in Components

```astro
---
import { useTranslations } from "../utils/useTranslations.ts";

const { t, currentLang } = useTranslations(Astro.url);
---

<h1>{t("hero.title")}</h1>
<p>{t("hero.subtitle")}</p>
<a href={`/${currentLang}/gallery`}>{t("nav.gallery")}</a>
```

### Translation File Structure

```json
{
  "hero": { "title": "...", "subtitle": "..." },
  "nav": { "fullMarathon": "...", "gallery": "..." },
  "seo": { "defaultTitle": "...", "description": "..." },
  "footer": { "contact": "...", "email": "..." }
}
```

### Naming Conventions

- **Hierarchical**: `section.subsection.key`
- **Descriptive**: `nav.fullMarathon` not `nav.fm`
- **camelCase**: `fullMarathon` not `full-marathon`
- **ASCII only**: No æøå in keys

### Adding Translations

1. Add keys to both `src/translations/no.json` and `src/translations/en.json`
2. Use in components: `t("newKey.subKey")`
3. Verify: `npm run i18n:audit`

**For detailed i18n patterns and advanced usage**, see [i18n.md](../standards/i18n.md).

---

## 🧩 Component Architecture

### Two-Layer Pattern

**Page Components** (`src/components/*Page.astro`):
- Complete page implementation
- Translation logic, SEO, business logic
- Examples: `GalleryPage.astro`, `HelmaratonPage.astro`

**Section Components** (`src/components/*Section.astro`):
- Reusable UI sections
- Examples: `HeroSection.astro`, `DistancesSection.astro`

### Layout System

`src/layouts/Layout.astro`:
- Main HTML structure
- SEO meta tags (OpenGraph, Twitter Card)
- Language detection
- Global styles

### Example Page Structure

```astro
---
// src/pages/[lang]/race.astro (Route wrapper)
import RacePage from "../../components/RacePage.astro";

export function getStaticPaths() {
  return [{ params: { lang: "no" } }, { params: { lang: "en" } }];
}
---
<RacePage />
```

```astro
---
// src/components/RacePage.astro (Page component)
import Layout from "../layouts/Layout.astro";
import { useTranslations } from "../utils/useTranslations.ts";

const { t, currentLang } = useTranslations(Astro.url);
---
<Layout title={t("seo.raceTitle")} lang={currentLang}>
  <h1>{t("race.heading")}</h1>
</Layout>
```

**For component best practices**, see [components.md](../standards/components.md).

---

## 🛠️ Development Tools

### Core Scripts

```bash
# Development
npm run dev            # Start dev server (localhost:4321)
npm run build          # Build for production → dist/
npm run preview        # Preview production build
npm run astro          # Run Astro CLI commands

# Type checking
npx astro check        # Check for Astro/TypeScript errors
```

### i18n Tools

```bash
npm run i18n:audit     # Check translation coverage/consistency
npm run i18n:fill      # Add placeholders for missing translations
npm run i18n:extract   # Extract translations from pages (legacy)
npm run i18n:merge     # Merge extracted translations (legacy)
```

**i18n:audit output:**
```json
{
  "missingNO": 0,     // Missing Norwegian keys
  "missingEN": 0,     // Missing English keys
  "unusedNO": 7,      // Potentially unused keys (may be false positives)
  "unusedEN": 7
}
```

### Claude AI Tools

AI-powered development helpers (requires `ANTHROPIC_API_KEY` in `.env`):

```bash
npm run claude:review  # Review active file for quality/standards
npm run claude:gen     # Generate component from description
npm run claude:seo     # Generate SEO metadata for pages
npm run claude:scan    # Scan codebase and generate tasks
npm run claude:test    # Test Claude API connection
```

**Usage example:**
```bash
# Review file for accessibility and best practices
npm run claude:review src/components/Header.astro
```

### Other Tools

```bash
npm run favicon:generate  # Generate favicon variants from source
```

---

## 🚢 Deployment

### Platform

**Hosting:** Domeneshop (FTP)
**CI/CD:** GitHub Actions
**Trigger:** Push to `main` branch

### Workflow

`.github/workflows/deploy.yml`:

```yaml
1. Checkout code
2. Install dependencies (npm ci)
3. Build Astro site (npm run build)
4. Deploy to FTP (SamKirkland/FTP-Deploy-Action)
   - Server: ftp.domeneshop.no
   - Target: /www/astro/
   - Source: ./dist/
```

### Manual Deployment

```bash
# Build locally
npm run build

# Preview build
npm run preview

# Upload dist/ to Domeneshop FTP manually if needed
```

### Pre-Deployment Checklist

Before pushing to `main`, review [CHECKLIST.md](../../CHECKLIST.md):
- ✅ WCAG 2.1 AA compliance
- ✅ All images have alt text
- ✅ i18n audit passes
- ✅ No console errors
- ✅ SEO meta tags present

**For detailed deployment info**, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 🔗 Related Documentation

### Standards & Guidelines

| Document | Purpose |
|----------|---------|
| [accessibility.md](../standards/accessibility.md) | WCAG 2.1 AA requirements, keyboard navigation, ARIA |
| [typography.md](../standards/typography.md) | Prose usage, readability, fonts |
| [design-system.md](../standards/design-system.md) | Colors, spacing, UI components |
| [i18n.md](../standards/i18n.md) | Detailed i18n patterns and conventions |
| [images.md](../standards/images.md) | Image optimization, alt text, formats |
| [seo.md](../standards/seo.md) | SEO best practices, meta tags, structured data |
| [components.md](../standards/components.md) | Component patterns and best practices |

### Development

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Detailed deployment process and troubleshooting |
| [image-optimization-plan.md](./image-optimization-plan.md) | Image optimization strategy |
| [local-fixes.md](./local-fixes.md) | Common local development fixes |

### Content & Contribution

| Document | Purpose |
|----------|---------|
| [content-guide.md](../content/content-guide.md) | Writing style, tone, content structure |
| [CONTRIBUTING.md](../../CONTRIBUTING.md) | How to contribute to the project |
| [CHECKLIST.md](../../CHECKLIST.md) | Pre-deployment verification checklist |

### Architecture Decisions

[docs/adr/decisions.md](../adr/decisions.md) - Architecture Decision Records (ADRs)

### AI Agent Configuration

[docs/ai-agents/](../ai-agents/) - Configuration for Claude, Gemini, and other AI agents

---

## 📝 Working with Pages

### Creating a New Page

1. **Create route wrapper** in `src/pages/[lang]/`:
   ```astro
   ---
   import NewPage from "../../components/NewPage.astro";
   export function getStaticPaths() {
     return [{ params: { lang: "no" } }, { params: { lang: "en" } }];
   }
   ---
   <NewPage />
   ```

2. **Create page component** in `src/components/`:
   ```astro
   ---
   import Layout from "../layouts/Layout.astro";
   import { useTranslations } from "../utils/useTranslations.ts";
   const { t, currentLang } = useTranslations(Astro.url);
   ---
   <Layout title={t("seo.newPageTitle")} lang={currentLang}>
     <h1>{t("newPage.heading")}</h1>
   </Layout>
   ```

3. **Add translations** to `src/translations/{no,en}.json`:
   ```json
   {
     "newPage": {
       "heading": "New Page Title"
     },
     "seo": {
       "newPageTitle": "New Page - Torghatten Maraton"
     }
   }
   ```

4. **Add navigation** (if needed) in `src/config/navLinks.ts`

5. **Verify**: `npm run i18n:audit`

---

## 🧪 Troubleshooting

### Missing Translations

**Symptom:** `undefined` appears instead of text

**Solution:**
```bash
npm run i18n:audit    # Identify missing keys
npm run i18n:fill     # Add placeholders
# Then edit src/translations/{no,en}.json manually
```

### Language Detection Fails

**Symptom:** Wrong language shows or redirect loops

**Check:**
- URL structure: `/no/page` or `/en/page`
- `getStaticPaths()` returns both languages
- Language validation in route wrapper:
  ```astro
  if (lang !== "no" && lang !== "en") {
    return Astro.redirect("/no/");
  }
  ```

### Build Errors

**Symptom:** `npm run build` fails

**Common causes:**
- TypeScript errors: `npx astro check`
- Missing translations: `npm run i18n:audit`
- Image optimization issues: Check `sharp` dependency

### Dev Server Won't Start

**Symptom:** Port 4321 already in use

**Solution:**
```bash
# Kill existing process
npx kill-port 4321

# Or use different port
npm run dev -- --port 3000
```

### Translations Not Updating

**Symptom:** Changes to `no.json`/`en.json` not reflected

**Solution:**
```bash
# Stop dev server (Ctrl+C)
# Clear Astro cache
rm -rf .astro
# Restart
npm run dev
```

### Deployment Fails

**Check:**
- GitHub Actions logs for errors
- FTP credentials in repository secrets
- Build completes locally: `npm run build`

**For more deployment issues**, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## 🔮 Future Enhancements

Potential improvements documented for future consideration:

- **Plural forms**: ICU MessageFormat for complex plurals
- **Date formatting**: Language-specific date/time formatting
- **Currency**: NOK vs USD formatting based on language
- **RTL support**: If adding Arabic/Hebrew languages
- **Content management**: Headless CMS integration
- **Image optimization**: Automatic WebP conversion, responsive images
- **Performance**: Service worker, offline support
- **Analytics**: Privacy-friendly analytics integration

---

## 📚 Additional Resources

- **Astro Documentation**: https://docs.astro.build
- **Tailwind Documentation**: https://tailwindcss.com/docs
- **Project README**: [README.md](../../README.md)
- **Contribution Guide**: [CONTRIBUTING.md](../../CONTRIBUTING.md)
