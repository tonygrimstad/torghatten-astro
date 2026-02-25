# Design system (Tailwind)

Dette dokumentet beskriver visuelle retningslinjer for prosjektet.

Mål:

- Konsistent uttrykk
- God kontrast og tilgjengelighet
- Enkel videreutvikling

---

## Farger

### Primære farger

- Gul: `yellow-300`, `yellow-400`
  Brukes som accent, CTA, markering
- Svart: `black/70`, `black/80`
- Hvit: `white`, `white/80`

### Aksentfarger (distanser)

- Blå: `border-blue-400`
- Rød: `border-red-400`
- Grønn: `border-green-400`

**Regler:**

- Ikke bruk gul tekst på lys bakgrunn
- Ikke bruk farge alene for å formidle informasjon

---

## Typografi

- H1: Én per side (sidens hovedtema)
- H2: Seksjoner
- H3: Underseksjoner
- Brødtekst: Lesbar, ikke for små størrelser

**Regler:**

- Unngå lange tekstblokker
- Bruk `prose` for teksttunge seksjoner
  (se `typography.md`)

---

## Lenker og CTA

- Lenker i brødtekst skal være tydelige (underline)
- CTA-knapper skal være visuelt tydelige og konsistente
- Samme handling → samme tekst (“Meld deg på”)

---

## Interaksjon

- Touch targets: minst 44px
- Fokus: alltid synlig fokusstil
- Hover skal ikke være eneste indikator

---

## Spacing og layout

### Standard spacing scale (Tailwind)

- **xs**: `p-1` / `m-1` (4px)
- **sm**: `p-2` / `m-2` (8px)
- **md**: `p-4` / `m-4` (16px)
- **lg**: `p-6` / `m-6` (24px)
- **xl**: `p-8` / `m-8` (32px)
- **2xl**: `p-12` / `m-12` (48px)

### Layout patterns

**Container pattern:**
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Innhold -->
</div>
```

**Section spacing:**
```html
<section class="py-12 lg:py-16">
  <!-- Seksjonsinnhold -->
</section>
```

**Grid pattern:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Elementer -->
</div>
```

---

## Component patterns

### CTA-knapper

**Primær CTA (gul):**
```html
<a
  href="#"
  class="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
>
  Meld deg på
</a>
```

**Sekundær knapp (outline):**
```html
<button
  class="border-2 border-white text-white px-6 py-3 rounded hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
>
  Les mer
</button>
```

### Kort/Cards

**Standard card:**
```html
<div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
  <h3 class="text-xl font-bold mb-2">Tittel</h3>
  <p class="text-white/80">Beskrivelse...</p>
</div>
```

**Card med hover:**
```html
<div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-colors">
  <!-- Innhold -->
</div>
```

### Distanse-badge

**Eksempel (blå accent):**
```html
<div class="border-l-4 border-blue-400 pl-4">
  <h3 class="text-2xl font-bold">Helmaraton</h3>
  <p class="text-white/70">42,195 km</p>
</div>
```

---

## Responsive breakpoints

Følg Tailwind defaults:

- **sm**: 640px (mobil landscape / small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large desktop)

**Retning**: Mobile-first (styling uten prefix gjelder mobil)

**Eksempel:**
```html
<!-- Mobil: full bredde, Desktop: 1/2 bredde -->
<div class="w-full lg:w-1/2">
  <!-- Innhold -->
</div>

<!-- Mobil: tekst sentrum, Desktop: tekst venstre -->
<p class="text-center lg:text-left">
  Tekst
</p>
```

---

## Focus styles

**Standard focus ring:**
```html
focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
```

**Focus på mørk bakgrunn:**
```html
focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
```

**Alltid sørg for at fokus er synlig!**

---

## Utility combinations

### Gradient backgrounds
```html
<div class="bg-gradient-to-r from-blue-500 to-blue-700">
```

### Backdrop blur (glasseffekt)
```html
<div class="bg-white/10 backdrop-blur-md">
```

### Shadow patterns
```html
<!-- Liten shadow -->
<div class="shadow-md">

<!-- Medium shadow -->
<div class="shadow-lg">

<!-- Stor shadow -->
<div class="shadow-2xl">
```

### Text opacity
```html
<p class="text-white/70">Sekundær tekst</p>
<p class="text-white/50">Tertiær tekst</p>
```

---

## Relatert dokumentasjon

Se også:

- `accessibility.md` - WCAG-krav for kontrast og touch targets
- `typography.md` - Typografi og lesbarhet
- `components.md` - Komponentstruktur
