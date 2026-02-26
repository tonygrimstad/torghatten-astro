# Torghatten Maraton – nettside

Dette repoet inneholder nettsiden for **Torghatten Maraton**.

Nettsiden er bygget som et raskt, tilgjengelig og lettlest statisk nettsted med fokus på:

- god brukeropplevelse (UX)
- universell utforming (WCAG)
- ytelse
- enkel videreutvikling

---

## Tech stack

- **Astro v4.x** (statisk nettsted)
- **Tailwind CSS v3.x**
- **Tailwind Typography** (`@tailwindcss/typography`) for lesbar tekst
- **TypeScript v5.x**
- **i18n** via mappebasert URL-struktur (`/no`, `/en`)
- **Node.js** v18+ (v20 recommended for development)
- Bilder primært fra `public/` (med plan for gradvis optimalisering)

---

## 💡 Viktige konsepter

Før du begynner å utvikle, er det nyttig å forstå disse nøkkelkonseptene:

### 1. **Dynamic Language Routing**
Alle sider bruker `[lang]`-routing for å håndtere både NO og EN:
- URL: `/no/helmaraton` → `src/pages/[lang]/helmaraton.astro`
- Språk detekteres automatisk fra URL
- Oversettelser hentes via `useTranslations()`

### 2. **Two-Layer Architecture**
Sider er delt i to lag:
- **Route Layer** (`src/pages/[lang]/*.astro`): Håndterer routing
- **Component Layer** (`src/components/*Page.astro`): Inneholder all logikk

### 3. **Type-Safe i18n**
Alle oversettelsesnøkler er type-safe:
```typescript
t("nav.helmaraton")  // ✅ Auto-completion
t("invalid.key")     // ❌ Type error
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (v20 recommended)
- **npm** or **pnpm**
- Git

### Setup Development Environment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tonygrimstad/torghatten-astro.git
   cd torghatten-astro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:4321
   ```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run TypeScript type checking |
| `npm run astro -- --help` | Show Astro CLI help |

### Project Structure

```
torghatten-astro/
├── src/
│   ├── components/      # Astro components
│   ├── config/          # Site configuration (see src/config/README.md)
│   ├── data/            # Structured data (see src/data/README.md)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Routes and pages
│   ├── translations/    # i18n JSON files
│   └── types/           # TypeScript type definitions
├── public/              # Static assets (images, fonts, etc.)
├── .github/             # GitHub Actions, Copilot instructions
└── docs/                # Documentation and standards
    ├── development/     # Technical docs (DEV.md, DEPLOYMENT.md)
    ├── standards/       # Code standards (accessibility, i18n, etc.)
    ├── content/         # Content guidelines
    ├── ai-agents/       # AI assistant instructions
    └── adr/             # Architecture Decision Records
```

### Deployment

See **`docs/development/DEPLOYMENT.md`** for detailed instructions on deploying to Domeneshop via GitHub Actions.

**Quick deploy workflow:**
1. Push changes to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site updates at `https://torghattenmaraton.no`

---

## Språk og URL-struktur

Språk styres via URL:

/no/... → Norsk (default)
/en/... → Engelsk

Strukturen i `src/pages/no` og `src/pages/en` skal speile hverandre.

Alle tekster håndteres via:

src/translations/no.json
src/translations/en.json

Se `docs/standards/i18n.md` for detaljer og regler.

---

## Prosjektmål (kvalitet)

Dette prosjektet har tydelige kvalitetsmål:

### Tilgjengelighet

- **WCAG 2.1 AA** er målsetting
- Tastaturnavigasjon
- Synlig fokus
- God kontrast
- Semantisk HTML

Se `docs/standards/accessibility.md`.

---

### Lesbarhet og innhold

- Tekst skal være skannbar og lett å forstå
- Bruk korte avsnitt, overskrifter og punktlister
- Bruk `prose` (Tailwind Typography) på teksttunge seksjoner

Se `docs/standards/typography.md` og `docs/content/content-guide.md`.

---

### Bilder og ytelse

- Bilder skal ha korrekt alt-tekst
- Hero- og nøkkelbilder skal vurderes for optimalisering
- Gradvis migrering til `astro:assets` der det gir verdi

Se `docs/standards/images.md`.

---

## Kode- og designprinsipper

- Bruk semantiske HTML-elementer
- Unngå unødvendig JavaScript
- Små, gjenbrukbare Astro-komponenter
- Konsistent design basert på Tailwind-klasser
- Gul brukes primært som accent (ikke brødtekst)

Se `docs/standards/design-system.md`.

---

## Copilot og utviklingsstøtte

Dette repoet er tilrettelagt for bruk av **GitHub Copilot i VS Code**.

Copilot styres av:

.github/copilot-instructions.md

Denne definerer:

- arkitekturvalg
- WCAG-krav
- i18n-regler
- kode- og designprinsipper

---

## 📚 Viktige dokumenter

### Development
| Fil | Formål |
|----|-------|
| [`docs/development/DEV.md`](docs/development/DEV.md) | Teknisk arkitektur og implementasjon |
| [`docs/development/DEPLOYMENT.md`](docs/development/DEPLOYMENT.md) | Deployment til Domeneshop via GitHub Actions |
| [`docs/development/local-fixes.md`](docs/development/local-fixes.md) | Lokale fikser og workarounds |

### Standards & Guidelines
| Fil | Formål |
|----|-------|
| [`docs/standards/accessibility.md`](docs/standards/accessibility.md) | WCAG-regler og sjekklister |
| [`docs/standards/a11y-components.md`](docs/standards/a11y-components.md) | Tilgjengelighetskrav per komponent |
| [`docs/standards/typography.md`](docs/standards/typography.md) | Lesbarhet og bruk av prose |
| [`docs/standards/images.md`](docs/standards/images.md) | Bildebruk, alt-tekst og ytelse |
| [`docs/standards/design-system.md`](docs/standards/design-system.md) | Farger, typografi og UI-regler |
| [`docs/standards/i18n.md`](docs/standards/i18n.md) | Språk og oversettelser |
| [`docs/standards/seo.md`](docs/standards/seo.md) | SEO-regler og metadata |
| [`docs/standards/components.md`](docs/standards/components.md) | Komponentstandarder |

### Content & Contribution
| Fil | Formål |
|----|-------|
| [`docs/content/content-guide.md`](docs/content/content-guide.md) | Innholdsstruktur og klarspråk |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Retningslinjer for bidrag |
| [`CHECKLIST.md`](CHECKLIST.md) | Sjekkliste før deploy |

---

## Anbefalt arbeidsflyt

1. Les denne README for oversikt
2. Se teknisk arkitektur i [`docs/development/DEV.md`](docs/development/DEV.md)
3. Følg standarder for:
   - Accessibility: [`docs/standards/accessibility.md`](docs/standards/accessibility.md)
   - i18n: [`docs/standards/i18n.md`](docs/standards/i18n.md)
   - Design: [`docs/standards/design-system.md`](docs/standards/design-system.md)
4. Før deploy: sjekk [`CHECKLIST.md`](CHECKLIST.md)
5. For deployment: se [`docs/development/DEPLOYMENT.md`](docs/development/DEPLOYMENT.md)

---

## Status

Prosjektet er under aktiv videreutvikling.
Dokumentasjonen er ment å være **levende** og oppdateres ved behov.
