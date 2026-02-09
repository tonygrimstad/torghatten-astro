# Typography & readability

Dette dokumentet beskriver hvordan tekst skal struktureres og presenteres
for å sikre god lesbarhet, tilgjengelighet og konsistens.

Prosjektet bruker **Tailwind Typography** (`@tailwindcss/typography`)
for innhold som skal leses.

---

## Mål

- Lett å skanne
- God linjelengde
- Forutsigbar struktur
- God kontrast og tilgjengelighet

---

## 1. Når bruke `prose`

Bruk `prose` på:

- distansesider (helmaraton, halvmaraton, osv.)
- praktisk informasjon
- informasjonstekster
- FAQ og forklarende innhold

Ikke bruk `prose` på:

- hero-seksjoner
- navigasjon
- korte UI-tekster
- knapper og CTA-er

---

## 2. Standard bruk

### Lys bakgrunn

```html
<article class="prose max-w-none">
  ...
</article>
```

### Mørk bakgrunn

```html
<article class="prose prose-invert max-w-none">
  ...
</article>
```

## 3. Tekststruktur

- Én H1 per side (sidens hovedtema)
- Bruk H2 for seksjoner
- Bruk H3 for underseksjoner
- Avsnitt: maks 2–4 linjer
- Én hovedidé per avsnitt

Bruk punktlister for:

- regler
- tider
- krav
- oppsummeringer

## 4. Lenker i tekst

- Lenker i brødtekst skal være tydelige
- Ikke kun farge som indikator (underline eller tilsvarende)
- Lenketekst skal være beskrivende

Eksempel:

❌ “Klikk her”
✅ “Se distanser”

## 5. Farger og kontrast

- Ikke bruk gul som brødtekst
- Gul brukes som:
  - aksent
  - CTA
  - ikon/border
- Brødtekst skal alltid ha tilstrekkelig kontrast

Se også:

- DESIGN-SYSTEM.md
- ACCESSIBILITY.md

## 6. Kodeblokker og tabeller

Tailwind Typography er konfigurert for:

- tydelig kontrast i kodeblokker
- lesbare tabeller

Unngå:

- lange kodeblokker uten kontekst
- tabeller uten forklarende tekst før eller etter

## 7. Forhold til WCAG

God typografi er en del av tilgjengelighet.

Dette dokumentet utfyller:

- ACCESSIBILITY.md (formelle krav)
- CONTENT-GUIDE.md (språk og innhold)
