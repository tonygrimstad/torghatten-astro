# SEO guidelines

Mål:

- God synlighet i søk
- Riktig indeksering av NO/EN
- Konsistente metadata på alle sider

SEO er implementert i `Layout.astro` og styres via oversettelser (`seo.*`).

---

## 1. Grunnprinsipper

- Alle sider skal ha:
  - `<title>`
  - `<meta name="description">`
  - **Nøyaktig én `<h1>`** per side (viktigste overskrift)
- SEO-tekster skal **aldri hardkodes**
- All SEO-tekst skal hentes via `useTranslations()`

### Overskriftshierarki

- ✅ **Én H1 per side** - Hovedoverskrift som beskriver sidens innhold
- ✅ **Beskrivende overskrifter** - Bruk H2, H3, etc. i logisk rekkefølge
- ✅ **Ingen hopp i hierarki** - Ikke hopp fra H1 til H3
- ✅ **Overskrifter er meningsfulle** - Unngå generiske titler som "Innhold" eller "Info"

Eksempel:
```astro
<h1>Helmaraton – Torghatten Maraton</h1> <!-- Kun én H1 -->
<h2>Løypeinformasjon</h2>
<h3>Start og mål</h3>
<h3>Høydeprofil</h3>
<h2>Påmelding</h2>
```

---

## 2. Språk og URL

- Norsk: `/no/...`
- Engelsk: `/en/...`
- Struktur skal speiles 1:1 mellom språk

**Krav:**

- Riktig `lang`-attributt på `<html>`
- Én side per språk per URL

---

## 3. Tittel og beskrivelse

### Tittel

- 50–60 tegn
- Viktigste ord først
- Format:

{Side} – Torghatten Maraton

### Beskrivelse

- 140–160 tegn
- Forklar hva brukeren finner på siden
- Ingen keyword stuffing

Eksempel:

```json
"seo": {
"helmaratonTitle": "Helmaraton – Torghatten Maraton",
"helmaratonDescription": "Informasjon om helmaraton under Torghatten Maraton, løype, klasser og påmelding."
}
```

## 4. Open Graph og sosiale medier

Layout.astro skal sette:

- og:title
- og:description
- og:type
- og:image

Regler:

- og:title og og:description skal gjenbruke SEO-verdier
- og:image:
  - skal ligge i public/
  - ha fast URL
  - være relevant for siden

## 5. Struktur for SEO-oversettelser

Alle SEO-tekster samles under seo.*:

```json
"seo": {
  "defaultTitle": "...",
  "defaultDescription": "...",
  "galleryTitle": "...",
  "galleryDescription": "...",
  "helmaratonTitle": "...",
  "helmaratonDescription": "..."
}
```

## 6. Sjekkliste ved ny side

- [] Tittel finnes i no.json
- [] Tittel finnes i en.json
- [] Beskrivelse finnes i no.json
- [] Beskrivelse finnes i en.json
- [] Verdiene brukes i Layout.astro
- [] Riktig språk i URL og <html lang="">

---

# Helhetsvurdering (så langt)

- **README.md** → veldig bra, men **må ferdigstilles** (nå gjort)
- **seo.md** → riktig retning, men **må fullføres** (nå gjort)
- Dokumentasjonen samlet sett:
  - er ryddig
  - er konsistent
  - er profesjonell
  - er Copilot-vennlig
