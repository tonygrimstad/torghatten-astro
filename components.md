# Component guidelines

Dette dokumentet beskriver hvordan komponenter i `src/components`
skal bygges, struktureres og brukes.

Mål:

- Forutsigbar arkitektur
- Gjenbrukbare komponenter
- God tilgjengelighet (WCAG)
- Enkel videreutvikling

---

## 1. Komponenttyper

### 1.1 Page components (`*Page.astro`)

Page-komponenter representerer **én full side**.

Kjennetegn:

- Brukes kun fra `src/pages/[lang]/*.astro`
- Inneholder:
  - `Layout`
  - SEO (title/description)
  - oversettelser
- Skal ikke gjenbrukes inne i andre sider

Eksempler:

- `HelmaratonPage.astro`
- `GalleryPage.astro`
- `BarnelopPage.astro`

---

### 1.2 Section components (`*Section.astro`)

Section-komponenter er **gjenbrukbare seksjoner**.

Kjennetegn:

- Skal ikke håndtere routing
- Skal ikke sette SEO
- Skal være språkbevisste via `useTranslations()`
- Kan brukes på flere sider

Eksempler:

- `HeroSection.astro`
- `DistancesSection.astro`
- `InfoSection.astro`
- `VideoSection.astro`

---

### 1.3 UI components

Små, fokuserte komponenter for interaksjon og visning.

Kjennetegn:

- Ingen hardkodet tekst
- Ingen sideansvar
- Enkelt ansvar per komponent

Eksempler:

- `signupButton.astro`
- `LightboxGallery.astro`
- `ClassList.astro`

---

## 2. Tilgjengelighet (WCAG)

Alle komponenter skal:

- være fullt tastaturvennlige
- ha synlig fokus
- bruke riktig HTML-element (`button`, `a`, `nav`, osv.)
- ikke bruke `div` som interaktivt element

Spesifikke krav per komponent:

- se `A11Y-COMPONENTS.md`

---

## 3. i18n-regler

- Ingen brukerrettet tekst skal hardkodes
- All tekst hentes via `useTranslations()`
- Oversettelsesnøkler skal være:
  - beskrivende
  - stabile
  - organisert hierarkisk

Eksempel:

```ts
t("nav.fullMarathon")
t("helmaraton.description")
Detaljer: se I18N.md og DEV.md.
```

## 4. Props og ansvar

- Props skal være eksplisitte og enkle
- Unngå “magiske” props med flere betydninger
- Komponenter skal gjøre én ting, og gjøre den godt

## 5. Hva komponenter IKKE skal gjøre

Komponenter skal ikke:

- manipulere URL direkte
- håndtere globale sideeffekter
- sette SEO (unntatt Page/Layout)
- anta språk uten å bruke i18n

## 6. Forhold til andre dokumenter

Dette dokumentet utfyller:

- DEV.md – teknisk arkitektur
- ACCESSIBILITY.md – WCAG-krav
- DESIGN-SYSTEM.md – visuelle regler
- TYPOGRAPHY.md – tekst og lesbarhet

yaml
Kopier kode
