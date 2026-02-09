# Accessibility (WCAG 2.1 AA) – Torghatten Maraton

Mål: Nettsiden skal være lett å bruke for alle. Vi sikter mot **WCAG 2.1 AA**.

Denne filen er “regelen”: Ved nye komponenter og endringer skal punktene under sjekkes.

---

## 1. Semantikk og struktur

- Bruk semantiske elementer: `header`, `nav`, `main`, `footer`, `section`.
- Én **H1** per side (hva siden handler om).
- Overskrifter i riktig rekkefølge (H1 → H2 → H3). Ikke hopp nivå.
- Bruk lister (`ul/ol`) til oppramsing, ikke bare linjeskift.

**Krav:**

- Sidene skal være skannbare: tydelige seksjoner og overskrifter.

---

## 2. Tastatur og fokus

Alt som er klikkbart må fungere uten mus.

**Krav:**

- Man skal kunne bruke `Tab` til alle interaktive elementer.
- Fokus skal alltid være synlig (ikke fjern outline uten å erstatte med bedre fokusstil).
- Rekkefølge for tabbing skal være logisk (top-down, left-right).
- Ingen “keyboard traps” (unntak: modaler/lightbox som *skal* fange fokus).

---

## 3. Lenker og knapper

**Ikke gjør dette:**

- `<div onClick=...>` (mangler tastatur/semantikk)
- Lenketekst som “klikk her”

**Gjør dette:**

- Bruk `<a>` for navigasjon (URL).
- Bruk `<button>` for handlinger (åpne modal, filtrere, etc.).
- Lenketekst skal gi mening uten kontekst:
  - ✅ “Se distanser”
  - ❌ “Les mer”

---

## 4. Kontrast og farger (gul/svart)

Vi bruker standard Tailwind-klasser (gul/svart/hvit + aksentfarger).

**Krav:**

- Normal tekst: minst **4.5:1** kontrast.
- Stor tekst (≥ 24px eller 18.66px bold): minst **3:1** kontrast.
- Ikke bruk farge alene for å formidle informasjon.

**Praktisk regel:**

- Unngå `text-yellow-300/400` på lys bakgrunn.
- Gul fungerer best som:
  - bakgrunn med mørk tekst
  - accent (border/ikon)
  - CTA-element (med god kontrast)

---

## 5. Bilder (alt-tekst)

**Krav:**

- Bilder som formidler informasjon: ha alt-tekst som forklarer *mening*.
- Dekorative bilder: `alt=""`.
- Unngå filnavn i alt.

Eksempler:

- ✅ `alt="Startfeltet på Torghatten Maraton 2025"`
- ✅ `alt=""` (dekorativ bakgrunn)
- ❌ `alt="torghattenmaraton20150217_1600.jpg"`

### Bilder og ytelse

- Store nøkkelbilder bør optimaliseres (vurder `astro:assets`).
- Hero-bilder påvirker LCP → optimaliser først.
Se også `IMAGES.md`.

---

## 6. Video og media

**Krav:**

- Video skal ha teksting (captions) eller et tekstlig alternativ/oppsummering.
- Ingen autoplay med lyd.
- Kontroller skal være tilgjengelige med tastatur.

---

## 7. Modaler / Lightbox (kritisk)

Gjelder `LightboxGallery.astro` og lignende.

**Krav når modal/lightbox er åpen:**

- Fokus flyttes inn i modal ved åpning.
- Fokus fanges (focus trap) inne i modal.
- `ESC` lukker modal.
- Når modal lukkes: fokus returnerer til elementet som åpnet den.
- Det finnes alltid en tydelig “Lukk”-knapp med tekst/aria-label.

---

## 8. Språk (NO/EN)

**Krav:**

- Dokumentet skal ha riktig språk (`lang="no"` eller `lang="en"`).
- Ikke bland språk i samme tekst uten å markere det.
- Oversettelser: engelsk kan falle tilbake til norsk om nøkkel mangler.

---

## 9. Sjekkliste før merge / deploy

- [ ] Tastatur: Tab gjennom hele siden, inkl. meny og galleri
- [ ] Fokus: synlig og logisk
- [ ] Overskrifter: riktig struktur, én H1
- [ ] Kontrast: sjekk gul tekst og lenker
- [ ] Bilder: alt-tekst ok
- [ ] Modal/lightbox: ESC, focus trap, fokus tilbake
- [ ] Video: captions/tekstalternativ
- [ ] NO/EN: riktig språk og sider finnes

---

## 10. Anbefalt testing

Manuelt:

- Tastaturtest (Tab/Shift+Tab/Enter/Escape)
- Zoom 200% (lesbarhet og layout)
- Mobil (touch targets)

Automatisk:

- Lighthouse (Accessibility)
- axe DevTools (browser extension)

### Lesbarhet

- Bruk `prose` (Tailwind Typography) for teksttunge seksjoner.
- Sørg for god linjelengde og tydelig hierarki (H2/H3 + lister).
