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

## 5) Case-sensitivity og filnavn (VIKTIG)

### Linux vs Windows

- **Windows**: Case-insensitive → `hero.jpg` og `Hero.jpg` er samme fil
- **Linux/GitHub Actions**: Case-sensitive → de er forskjellige filer

### Regel

✅ **Filnavn må matche imports EKSAKT (case-sensitive)**

Eksempel:

```astro
// ❌ Feil - vil feile på GitHub Actions
import heroImg from "../assets/hero/herosek-tmbru.jpg"; // Git: herosek-Tmbru.jpg

// ✅ Riktig
import heroImg from "../assets/hero/herosek-tmbru.jpg"; // Git: herosek-tmbru.jpg
```

### Når bilder må være i både `src/assets` OG `public`

Hvis Astro ser etter et bilde med absolutt path (f.eks. `/herosek-tmbru.jpg`) under build, må bildet finnes i `public/`:

```astro
// Dette krever at bildet finnes i public/herosek-tmbru.jpg
<img src="/herosek-tmbru.jpg" alt="Hero" />

// Dette krever kun src/assets/hero/herosek-tmbru.jpg
import heroImg from "../assets/hero/herosek-tmbru.jpg";
```

**Løsning når begge trengs:**

1. Original i `src/assets/hero/herosek-tmbru.jpg`
2. Kopi i `public/herosek-tmbru.jpg`
3. Commit begge til Git

---

## 6) Astro assets eksempel

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
