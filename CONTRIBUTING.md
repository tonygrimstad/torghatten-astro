# Bidra til Torghatten Maraton-nettstedet

Takk for at du vurderer å bidra! 🎉
Dette prosjektet drives av frivillige og har tydelige kvalitetskrav.

---

## Hvordan bidra

1. 📁 Fork dette prosjektet
2. 🌿 Opprett en ny branch (ikke bruk `main` direkte)
3. 🔧 Gjør endringene dine og test lokalt
4. 🔀 Lag en pull request (PR) tilbake til `main`

---

## Retningslinjer

### Kode og struktur

- Følg eksisterende komponentstruktur
- Unngå unødvendig JavaScript
- Bruk Astro-komponenter og Tailwind CSS

### AI-assistert utvikling

Når du bruker AI-verktøy (Copilot, Claude, etc.) til å generere kode:

- **Prefer modifying existing files** over creating new ones
- **Reuse existing components** whenever possible - check `src/components/` first
- **Follow current naming conventions** - see existing files for patterns
- **Avoid new dependencies** unless explicitly necessary
- **Don't restructure folders** unless specifically requested
- Always review AI-generated code for quality and standards compliance

Se `.github/copilot-instructions.md` for mer detaljerte retningslinjer.

### Språk (i18n)

- Ingen hardkodet brukerrettet tekst
- Alle tekster via `useTranslations()`
- Husk både `no.json` og `en.json`

Se `docs/standards/i18n.md`.

### Tilgjengelighet og kvalitet

- Endringer skal følge WCAG 2.1 AA
- Tastatur og fokus må fungere
- Bilder må ha korrekt alt-tekst

Se:

- `docs/standards/accessibility.md`
- `docs/standards/a11y-components.md`

---

## Commit message conventions

Bruk beskrivende commit-meldinger med type-prefix:

- `feat:` - Ny funksjonalitet
- `fix:` - Bugfiks
- `docs:` - Dokumentasjonsendringer
- `style:` - Formatering (ingen kodeendring)
- `refactor:` - Kodeomstrukturering
- `test:` - Testing
- `chore:` - Build/config-endringer

**Eksempler:**
```
feat: add gallery year indicator in lightbox
fix: correct contrast on yellow CTA buttons
docs: update i18n guidelines with examples
```

---

## Branch naming

Bruk beskrivende branch-navn med prefix:

- `feature/` - Ny funksjonalitet (f.eks. `feature/gallery-year-badge`)
- `bugfix/` - Bugfikser (f.eks. `bugfix/menu-focus-trap`)
- `docs/` - Dokumentasjon (f.eks. `docs/update-readme`)
- `refactor/` - Omstrukturering (f.eks. `refactor/component-structure`)

---

## Testing

Før du lager PR, test følgende:

### Lokal testing
- [ ] Kjør `npm run dev` og verifiser endringer
- [ ] Kjør `npm run build` uten feil
- [ ] Kjør `npm run check` (TypeScript)

### Manuell testing
- [ ] Test på mobil og desktop
- [ ] Test tastaturnavigasjon (Tab/Enter/Escape)
- [ ] Test på begge språk (NO/EN)
- [ ] Zoom til 200% og sjekk layout
- [ ] Test i ulike nettlesere (Chrome, Firefox, Safari)

### Accessibility
- [ ] Kjør Lighthouse (mål: 100 Accessibility)
- [ ] Sjekk kontrast på nye farger (WebAIM)
- [ ] Sjekk at fokus er synlig
- [ ] Verifiser alt-tekst på nye bilder

---

## Pull Request process

1. **Beskriv endringene**:
   - Hva løser PR-en?
   - Hvorfor er endringen nødvendig?
   - Hvordan har du testet?

2. **Inkluder screenshots** (hvis visuell endring)

3. **Link til relaterte issues** (hvis aktuelt)

4. **Sjekk at CI/CD kjører grønt**

5. **Vent på code review** før merge

---

## Code style

- **Astro components**: Bruk `.astro`-format for UI
- **TypeScript**: Bruk type-safety der mulig
- **Tailwind**: Bruk utility-klasser, unngå custom CSS
- **Kommentarer**: Skriv kommentarer for kompleks logikk
- **Filnavn**:
  - Components: `PascalCase.astro` (f.eks. `HeroSection.astro`)
  - Utils: `camelCase.ts` (f.eks. `useTranslations.ts`)
  - Config: `camelCase.ts` (f.eks. `siteConfig.ts`)

---

## Før du lager PR

- Kjør siden lokalt
- Gå gjennom `CHECKLIST.md`
- Sjekk at NO/EN fortsatt speiler hverandre
- Følg commit message conventions
- Test accessibility grundig

---

## Spørsmål eller forslag?

Opprett et Issue:

🔧 https://github.com/TonyGrimstad/torghatten-astro/issues

---

🤖 Utviklet og driftet av TonyG
📧 Kontakt: webmaster@torghattenmaraton.no
