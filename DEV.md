# Torghatten Maraton - Developer Guide

## Scope of this document

This document describes the **technical architecture and implementation details**
of the Torghatten Maraton website.

For non-technical guidelines, see:

- ACCESSIBILITY.md (WCAG and usability)
- TYPOGRAPHY.md (readability and prose usage)
- CONTENT-GUIDE.md (content and structure)
- IMAGES.md (image usage and performance)
- DESIGN-SYSTEM.md (colors, typography, UI rules)

## 🌍 Internationalization (i18n) Architecture

This project implements a custom i18n system for Norwegian (NO) and English (EN) languages using Astro's dynamic routing and TypeScript.

## Architecture Overview

### File Structure

```
src/
├── translations/           # Translation files
│   ├── no.json            # Norwegian translations
│   └── en.json            # English translations
├── utils/
│   └── useTranslations.ts # Core i18n utility
├── config/
│   ├── navLinks.ts        # Navigation configuration
│   └── i18n.ts           # Legacy i18n config (fallback)
├── pages/
│   └── [lang]/           # Dynamic language routing
│       ├── index.astro   # Home page (wrapper)
│       ├── gallery.astro # Gallery page (wrapper)
│       └── *.astro       # Race pages (wrappers)
├── components/           # Language-aware components
│   ├── *Page.astro       # Page components (BarnelopPage, GalleryPage, etc.)
│   ├── *Section.astro    # Reusable sections
│   └── Layout components # Header, Footer, etc.
└── layouts/
    └── Layout.astro     # SEO-enabled layout
```

### Core Components

#### 1. Translation System (`useTranslations.ts`)

The heart of the i18n system. Provides:

- Language detection from URL path
- Translation function `t(key, fallback?)`
- Fallback support to legacy config
- Type-safe translation access

```typescript
// Usage in components
const { t, currentLang } = useTranslations(Astro.url);
const title = t("nav.fullMarathon"); // "Helmaraton" / "Full Marathon"
```

#### 2. Dynamic Routing (`[lang]` directory)

All pages use dynamic language routing with a **consolidated architecture**:

- URL: `/no/helmaraton` → `src/pages/[lang]/helmaraton.astro` → `src/components/HelmaratonPage.astro`
- URL: `/en/helmaraton` → `src/pages/[lang]/helmaraton.astro` → `src/components/HelmaratonPage.astro`
- Route files are lightweight wrappers
- Business logic consolidated in `*Page.astro` components
- Single codebase serves both languages

#### 3. Consolidated Page Architecture

The project uses a **two-layer architecture**:

```
[lang]/page.astro (Route Layer)
    ↓
*Page.astro (Component Layer)
```

**Route Layer** (`src/pages/[lang]/*.astro`):

- Handles `getStaticPaths()` for language generation
- Language parameter validation
- Lightweight wrapper calling page component

**Component Layer** (`src/components/*Page.astro`):

- Complete page implementation
- Translation logic
- SEO metadata
- All business logic

**Examples:**

- `[lang]/gallery.astro` → `GalleryPage.astro`
- `[lang]/helmaraton.astro` → `HelmaratonPage.astro`
- `[lang]/barnelop.astro` → `BarnelopPage.astro`

#### 3. Translation JSON Structure

Organized by functional areas:

```json
{
  "hero": { "title": "...", "subtitle": "..." },
  "nav": { "fullMarathon": "...", "gallery": "..." },
  "seo": { "defaultTitle": "...", "galleryDescription": "..." },
  "footer": { "contact": "...", "email": "..." },
  "helmaraton": { "description": "...", "certified": "..." }
}
```

## Implementation Patterns

### 1. Consolidated Page Implementation

**Route Wrapper Pattern** (`src/pages/[lang]/*.astro`):

```astro
---
import PageName from "../../components/PageNamePage.astro";

export function getStaticPaths() {
  return [{ params: { lang: "no" } }, { params: { lang: "en" } }];
}

const { lang } = Astro.params;

// Validate language parameter
if (lang !== "no" && lang !== "en") {
  return Astro.redirect("/no/page");
}
---

<PageName />
```

**Page Component Pattern** (`src/components/*Page.astro`):

```astro
---
import Layout from "../layouts/Layout.astro";
import { useTranslations } from "../utils/useTranslations.ts";

const { t, currentLang } = useTranslations(Astro.url);
---

<Layout
  title={t("seo.pageTitle")}
  description={t("seo.pageDescription")}
  lang={currentLang}
>
  <h1>{t("page.heading")}</h1>
  <p>{t("page.content")}</p>
</Layout>
```

**Benefits of this architecture:**

- ✅ **DRY Principle**: No duplication of page logic
- ✅ **Maintainability**: Single source of truth per page
- ✅ **Testability**: Components can be tested independently
- ✅ **Reusability**: Components can be used in different contexts
- ✅ **SEO**: Proper meta tags and language detection

### 2. Section Component Implementation

Language-aware components:

```astro
---
import { useTranslations } from "../utils/useTranslations.ts";

const { t, currentLang } = useTranslations(Astro.url);
---

<nav>
  <a href={`/${currentLang}/gallery`}>
    {t("nav.gallery")}
  </a>
</nav>
```

### 3. Navigation Configuration

Navigation uses translation keys instead of hardcoded text:

```typescript
// navLinks.ts
export const navLinks: NavItem[] = [
  {
    label: "distances",  // Corresponds to t("nav.distances")
    dropdown: [
      { href: "helmaraton", label: "fullMarathon" }, // t("nav.fullMarathon")
      { href: "halvmaraton", label: "halfMarathon" }, // t("nav.halfMarathon")
    ],
  },
];
```

### 4. SEO Integration

SEO meta tags are fully internationalized:

```astro
<!-- Layout.astro -->
<head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
</head>
```

## Component Architecture Overview

### Page Components (`*Page.astro`)

The project uses dedicated page components for consistent architecture:

| Component | Route | Purpose |

|-----------|-------|----------|
| `BarnelopPage.astro` | `/[lang]/barnelop` | Kids race page |
| `GalleryPage.astro` | `/[lang]/gallery` | Photo gallery with year filtering |
| `HalvmaratonPage.astro` | `/[lang]/halvmaraton` | Half marathon race page |
| `HelmaratonPage.astro` | `/[lang]/helmaraton` | Full marathon race page |
| `MinimaratonPage.astro` | `/[lang]/minimaraton` | Mini marathon race page |
| `OygaloppenPage.astro` | `/[lang]/oygaloppen` | Island race page |
| `ParalopPage.astro` | `/[lang]/paralop` | Para race page |
| `TrimPage.astro` | `/[lang]/trim` | Trim activity page |

### Section Components

Reusable components for common functionality:

- `Header.astro` - Navigation with language switching
- `Footer.astro` - Site footer with contact info
- `HeroSection.astro` - Homepage hero section
- `DistancesSection.astro` - Race distances overview
- `InfoSection.astro` - Feature-toggled information section
- `Top5recordsComponent.astro` - Race records display
- `ClassList.astro` - Age class listings
- `VideoSection.astro` - Embedded video sections
- `LightboxGallery.astro` - Photo gallery with lightbox

### Layout System

- `Layout.astro` - Main layout with SEO meta tags, language detection
- Supports dynamic title, description, and lang attributes
- Includes OpenGraph and Twitter Card meta tags

## Translation Workflow

### Adding New Translations

1. **Add to JSON files**:

   ```bash
   # Add key to both files
   vim src/translations/no.json  # Norwegian
   vim src/translations/en.json  # English
   ```

3. **Use in components**

   ```astro
   ---
   const { t } = useTranslations(Astro.url);
   ---
   <p>{t("newSection.content")}</p>
   ```

4. **Verify with audit**

   ```bash
   npm run i18n:audit  # Should show 0 missing keys
   ```

### Key Naming Conventions

- **Hierarchical**: `section.subsection.key`
- **Descriptive**: `nav.fullMarathon` not `nav.fm`
- **ASCII only**: No Norwegian characters in keys
- **camelCase**: `fullMarathon` not `full-marathon`

### Translation Categories

| Category | Purpose | Example Keys |

|----------|---------|--------------|
| `hero.*` | Homepage hero section | `hero.title`, `hero.subtitle` |
| `nav.*` | Navigation elements | `nav.distances`, `nav.gallery` |
| `seo.*` | SEO meta tags | `seo.defaultTitle`, `seo.galleryDescription` |
| `footer.*` | Footer content | `footer.contact`, `footer.organizedBy` |
| `[race].*` | Race-specific content | `helmaraton.description`, `oygaloppen.certified` |

## Maintenance Scripts

### i18n Audit System

```bash
# Check translation coverage
npm run i18n:audit
# Output: { "missingNO": 0, "missingEN": 0, "unusedNO": 7, "unusedEN": 7 }

# Fill missing translations with placeholders
npm run i18n:fill

# Extract translations from pages (legacy)
npm run i18n:extract

# Merge extracted translations (legacy)
npm run i18n:merge
```

### Audit Output Interpretation

```json
{
  "summary": {
    "usedKeys": 108,      // Keys found in codebase
    "noKeys": 115,        // Total keys in no.json
    "enKeys": 115,        // Total keys in en.json
    "missingNO": 0,       // ✅ No missing Norwegian
    "missingEN": 0,       // ✅ No missing English
    "unusedNO": 7,        // Potentially unused Norwegian keys
    "unusedEN": 7         // Potentially unused English keys
  },
  "unused": {
    "no": ["nav.distances", "nav.results", ...], // False positives
    "en": ["nav.distances", "nav.results", ...]  // (used via template literals)
  }
}
```

**Note**: Some "unused" keys are false positives due to dynamic usage patterns like `t(\`nav.${link.label}\`)`.

## Advanced Patterns

### Language Switching

```astro
---
const { currentLang } = useTranslations(Astro.url);
const path = Astro.url.pathname;
const restPath = path.split("/").slice(2).join("/");
const otherLang = currentLang === "no" ? "en" : "no";
const switchUrl = `/${otherLang}/${restPath}`;
---

<a href={switchUrl}>
  {currentLang === "no" ? "🇬🇧 English" : "🇳🇴 Norsk"}
</a>
```

### Conditional Content

```astro
---
const { t, currentLang } = useTranslations(Astro.url);
---

{currentLang === "no" && (
  <p>Kun synlig på norsk</p>
)}

<p>{t("shared.content")}</p>
```

### Dynamic Translation Keys

```astro
---
const raceType = "helmaraton";
const { t } = useTranslations(Astro.url);
---

<h1>{t(`${raceType}.title`)}</h1>
<p>{t(`${raceType}.description`)}</p>
```

## SEO Implementation

### Page-specific SEO

Each page can provide custom SEO metadata:

```astro
<Layout
  title={t("seo.galleryTitle")}           // "Gallery - Torghatten Marathon"
  description={t("seo.galleryDescription")} // Custom description
  lang={currentLang}
>
```

### SEO Translation Structure

```json
{
  "seo": {
    "defaultTitle": "Torghatten Marathon - Norway's Most Beautiful Marathon",
    "defaultDescription": "Experience running joy in scenic surroundings...",
    "galleryTitle": "Gallery - Torghatten Marathon",
    "fullMarathonTitle": "Full Marathon - Torghatten Marathon"
  }
}
```

## Troubleshooting

### Common Issues

1. **Missing translations show as `undefined`**

   ```bash
   npm run i18n:audit  # Check for missing keys
   npm run i18n:fill   # Add placeholders
   ```

2. **Language detection fails**
   - Verify URL structure: `/no/page` or `/en/page`
   - Check `getStaticPaths()` in page component
   - Ensure language validation logic exists

3. **Translations not updating**

   ```bash
   npm run build  # Rebuild to pick up JSON changes
   ```

4. **SEO tags missing language**
   - Verify `lang={currentLang}` prop in Layout
   - Check Layout.astro has `<html lang={lang}>`

### Debugging

```astro
---
const { t, currentLang } = useTranslations(Astro.url);
console.log("Current language:", currentLang);
console.log("Translation test:", t("nav.gallery"));
---

<!-- Debug info in HTML -->
<p>Lang: {currentLang}</p>
<p>URL: {Astro.url.pathname}</p>
```

## Performance Considerations

- **Static generation**: All translations bundled at build time
- **No runtime fetching**: Translations loaded synchronously
- **Tree shaking**: Unused JSON sections removed by bundler
- **Caching**: Built pages cached until next deployment

## Future Enhancements

- **Plural forms**: Consider ICU MessageFormat for complex plurals
- **Date formatting**: Language-specific date/time formatting
- **Currency**: NOK vs USD formatting based on language
- **RTL support**: If adding Arabic/Hebrew languages
- **Content management**: Consider headless CMS integration

## Migration Notes

The current system migrated from:

- ❌ Separate `/no/` and `/en/` page directories
- ❌ Hardcoded language-specific content
- ✅ Dynamic `[lang]` routing with JSON translations
- ✅ Centralized translation management
- ✅ SEO-optimized multilingual setup

This architecture provides maintainable, scalable internationalization while preserving SEO benefits and user experience.
