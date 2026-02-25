# Component accessibility rules

Denne filen beskriver a11y-regler for spesifikke komponenter i `src/components`.

---

## Header / Navigation (`Header.astro`)

- Skip-link: "Hopp til innhold"
- Mobilmeny:
  - `aria-expanded`
  - ESC lukker
  - Fokus flyttes inn i meny ved åpning
  - Fokus returnerer til menyknapp ved lukking

---

## Lightbox (`LightboxGallery.astro`)

Krav:

- Fokusfelle (focus trap) i lightbox
- ESC lukker
- Lukk-knapp med `aria-label="Lukk bildevisning"`
- Piltaster for neste/forrige (hvis implementert)
- Fokus returneres til elementet som åpnet lightbox

---

## Buttons & Links (`signupButton.astro`)

- Bruk `<a>` for navigasjon til ekstern påmelding
- Bruk `<button>` kun for handlinger som ikke navigerer
- Touch target minst 44px

---

## Video (`VideoSection.astro`)

- Ingen autoplay med lyd
- Captions eller tekstlig alternativ
- Kontroller må være tastaturvennlige
