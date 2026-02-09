# Images & media policy

Status:

- Prosjektet bruker primært statiske bilder fra `public/`.
- Tailwind Typography brukes (prose-klasser).

Mål:

- God ytelse (LCP) og god tilgjengelighet (WCAG).
- Riktig bruk av alt-tekst.

---

## 1) Hvor skal bilder ligge?

### A) `public/` (ok for)

- Logoer/ikoner som ikke trenger optimalisering
- Små bilder som sjelden endres
- Filer som må ha fast URL

Eksempel:

- `/images/logos/...`
- `/favicon.svg`

### B) `src/assets/` + `astro:assets` (anbefalt for)

- Hero-bilder og store bilder på forsiden
- Bilder som vises ofte og påvirker lastetid
- Bilder som bør leveres responsivt (mobil/desktop)

Fordeler:

- Automatisk optimalisering (WebP/AVIF)
- Responsive størrelser
- Lazy loading (der det passer)
- Bedre Lighthouse score

---

## 2) Alt-tekst (WCAG)

### Informative bilder

Alt skal beskrive *mening*, ikke filnavn.

- ✅ "Startfeltet på Torghatten Maraton 2025"
- ✅ "Løpere i målområdet ved kaia"

### Dekorative bilder

Bruk `alt=""` når bildet ikke tilfører informasjon.

### Logoer

- Hvis logoen er lenke: `alt="Sponsor: <Navn>"`
- Hvis logo kun er pynt: `alt=""` (men vurder om den faktisk bør ha tekst)

---

## 3) Lazy loading og LCP

- Hero-bilde er ofte LCP → bør være optimalisert og ikke unødvendig stort.
- Bilder under fold kan være lazy.

---

## 4) Anbefalt migrering (pragmatisk)

Start med:

1) Forside hero-bilde
2) 1–3 “tunge” bilder i galleri/sections
3) Ikke migrer alt på én gang

---

## 5) Astro assets eksempel

```astro
---
import { Image } from "astro:assets";
import heroImg from "../assets/hero.jpg";
---

<Image
  src={heroImg}
  alt="Startfeltet på Torghatten Maraton"
  widths={[480, 768, 1024, 1280]}
  sizes="(max-width: 768px) 100vw, 1200px"
/>
