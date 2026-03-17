# Config Directory

This directory contains **centralized configuration files** for the Torghatten Maraton website.

---

## 📂 Structure

```
src/config/
├── classGroups.ts    # Race distance class/age group definitions
├── i18n.ts           # Language configuration
├── navLinks.ts       # Navigation menu structure
├── siteConfig.ts     # Site-wide metadata and settings
├── sponsors.ts       # Sponsor information and logos
└── README.md         # This file
```

---

## ⚙️ Configuration Files

### `siteConfig.ts`
**Site-wide metadata and settings**

```typescript
export const siteMeta = {
  title: "Torghatten Maraton",
  description: "...",
  phone: "+47 123 45 678",
  // ...
};
```

**Used for:**
- Default SEO metadata
- Contact information
- Social media handles
- Site-wide constants

**How to modify:**
- Update values directly in the file
- Changes apply globally across all pages

---

### `navLinks.ts`
**Navigation menu structure**

```typescript
export const navLinks = [
  { labelKey: "nav.distances", href: "/distanser" },
  // ...
];
```

**Used for:**
- Header navigation
- Footer links
- Language switcher paths

**How to add a new link:**
1. Add entry to `navLinks` array
2. Add translation key to `src/translations/no.json` and `en.json`
3. Navigation auto-updates in Header/Footer components

---

### `sponsors.ts`
**Sponsor information**

```typescript
export const sponsors = {
  main: [
    {
      name: "Sponsor Navn",
      logo: "/images/sponsors/logo.png",
      url: "https://example.com",
      tier: "main"
    },
    // ...
  ],
  // ...
};
```

**Tiers:**
- `main` - Main sponsors (largest display)
- `supporting` - Supporting sponsors (medium)
- `partners` - Partner sponsors (smaller)

**How to add a sponsor:**
1. Add logo to `public/images/sponsors/`
2. Add entry to appropriate tier array in `sponsors.ts`
3. Sponsor appears automatically on sponsor page and sections

---

### `classGroups.ts`
**Race class and age group definitions**

```typescript
export const classGroups = {
  helmaraton: [
    {
      className: "Kvinner 18-39 år",
      // ...
    },
    // ...
  ],
  // ...
};
```

**Used for:**
- Results categorization
- Registration forms
- Class information displays

**How to update:**
- Edit class definitions for each distance
- Used by `ClassList.astro` component

---

### `i18n.ts`
**Language configuration**

```typescript
export const languages = {
  no: "Norsk",
  en: "English"
};

export const defaultLang = "no";
```

**Used for:**
- Language detection
- Translation fallbacks
- URL routing (`/no/`, `/en/`)

**How to add a new language:**
1. Add language to `languages` object
2. Create `/src/translations/{lang}.json`
3. Add pages in `/src/pages/[lang]/`
4. Update language switcher in `src/components/Footer.astro`

---

## 🎯 Best Practices

### DO ✅
- **Keep configs centralized** - Don't hardcode values in components
- **Use TypeScript** - Export typed objects for autocomplete
- **Document changes** - Add comments for complex configurations
- **Test after changes** - Run `npm run dev` to verify updates

### DON'T ❌
- **Don't duplicate data** - Import from config instead
- **Don't mix data and config** - Data files go in `src/data/`
- **Don't hardcode URLs** - Use relative paths from config
- **Don't skip type definitions** - Export interfaces for complex configs

---

## 🔄 Import Examples

```typescript
// In a component
import { siteMeta } from "../config/siteConfig.ts";
import { navLinks } from "../config/navLinks.ts";
import { sponsors } from "../config/sponsors.ts";

// Usage
<a href={`mailto:${siteMeta.email}`}>Contact</a>
```

---

## 🆘 Troubleshooting

**Navigation links not updating?**
- Check that translation keys exist in both `no.json` and `en.json`
- Verify `labelKey` matches exactly (case-sensitive)
- Restart dev server (`npm run dev`)

**Sponsors not displaying?**
- Verify logo path matches file in `public/images/sponsors/`
- Check tier name is exactly `"main"`, `"supporting"`, or `"partners"`
- Ensure logo file format is web-compatible (PNG, SVG, WEBP)

**Type errors?**
- Run `npm run check` to see TypeScript errors
- Compare structure to existing entries
- Ensure all required fields are present
