# Torghatten Maraton – nettside

Dette repoet inneholder nettsiden for **Torghatten Maraton**.

Nettsiden er bygget som et raskt, tilgjengelig og lettlest statisk nettsted med fokus på:

- god brukeropplevelse (UX)
- universell utforming (WCAG)
- ytelse
- enkel videreutvikling

---

## Tech stack

- **Astro** (statisk nettsted)
- **Tailwind CSS**
- **Tailwind Typography** (`prose`) for lesbar tekst
- **TypeScript**
- **i18n** via mappebasert URL-struktur (`/no`, `/en`)
- Bilder primært fra `public/` (med plan for gradvis optimalisering)

---

## Språk og URL-struktur

Språk styres via URL:

/no/... → Norsk (default)
/en/... → Engelsk

Strukturen i `src/pages/no` og `src/pages/en` skal speile hverandre.

Alle tekster håndteres via:

src/translations/no.json
src/translations/en.json

Se `I18N.md` for detaljer og regler.

---

## Prosjektmål (kvalitet)

Dette prosjektet har tydelige kvalitetsmål:

### Tilgjengelighet

- **WCAG 2.1 AA** er målsetting
- Tastaturnavigasjon
- Synlig fokus
- God kontrast
- Semantisk HTML

Se `ACCESSIBILITY.md`.

---

### Lesbarhet og innhold

- Tekst skal være skannbar og lett å forstå
- Bruk korte avsnitt, overskrifter og punktlister
- Bruk `prose` (Tailwind Typography) på teksttunge seksjoner

Se `TYPOGRAPHY.md` og `CONTENT-GUIDE.md`.

---

### Bilder og ytelse

- Bilder skal ha korrekt alt-tekst
- Hero- og nøkkelbilder skal vurderes for optimalisering
- Gradvis migrering til `astro:assets` der det gir verdi

Se `IMAGES.md`.

---

## Kode- og designprinsipper

- Bruk semantiske HTML-elementer
- Unngå unødvendig JavaScript
- Små, gjenbrukbare Astro-komponenter
- Konsistent design basert på Tailwind-klasser
- Gul brukes primært som accent (ikke brødtekst)

Se `DESIGN-SYSTEM.md`.

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

## Viktige dokumenter

| Fil | Formål |
|----|-------|
| `DEV.md` | Teknisk arkitektur og implementasjon |
| `DEPLOYMENT.md` | Deployment til Domeneshop via GitHub Actions |
| `ACCESSIBILITY.md` | WCAG-regler og sjekklister |
| `A11Y-COMPONENTS.md` | Tilgjengelighetskrav per komponent |
| `TYPOGRAPHY.md` | Lesbarhet og bruk av prose |
| `CONTENT-GUIDE.md` | Innholdsstruktur og klarspråk |
| `IMAGES.md` | Bildebruk, alt-tekst og ytelse |
| `DESIGN-SYSTEM.md` | Farger, typografi og UI-regler |
| `I18N.md` | Språk og oversettelser |
| `SEO.md` | SEO-regler og metadata |
| `CHECKLIST.md` | Sjekkliste før deploy |

---

## Anbefalt arbeidsflyt

1. Les `README.md`
2. Følg retningslinjene i:
   - `DEV.md`
   - `ACCESSIBILITY.md`
   - `I18N.md`
3. Bruk Copilot aktivt – repoet gir kontekst
4. For deployment: se `DEPLOYMENT.md`
5. Før deploy: gå gjennom `CHECKLIST.md`

---

## Status

Prosjektet er under aktiv videreutvikling.
Dokumentasjonen er ment å være **levende** og oppdateres ved behov.
