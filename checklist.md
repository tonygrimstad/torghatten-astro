# Pre-deploy checklist

Denne sjekklisten skal gjennomgås **før publisering** (deploy).

---

## ✅ Must Have (kritisk)

### Funksjonalitet

- [ ] Alle interne lenker fungerer (NO/EN)
- [ ] 404-side vises korrekt
- [ ] Språkbytte fungerer og peker til tilsvarende side
- [ ] Alle sider har både NO og EN versjon
- [ ] Ingen JavaScript-feil i console

### Tilgjengelighet (WCAG 2.1 AA)

- [ ] Tastatur: meny + alle CTA + galleri fungerer
- [ ] Fokus synlig og logisk overalt
- [ ] Lightbox: ESC lukker, focus trap, fokus tilbake
- [ ] Kontrast: gul tekst/lenker sjekket (min 4.5:1)
- [ ] Bilder: korrekt alt-tekst (eller `alt=""` hvis dekorativ)
- [ ] Video: captions eller tekstalternativ
- [ ] Lighthouse Accessibility: minimum 95 (mål: 100)

### Internasjonalisering (i18n)

- [ ] Alle nye tekster i `no.json` og `en.json`
- [ ] Ingen hardkodet tekst i komponenter
- [ ] `useTranslations()` brukt konsekvent
- [ ] Begge språk testet manuelt
- [ ] Språk-switcher fungerer på alle sider
- [ ] Translation keys følger navnekonvensjoner

### Innhold og SEO

- [ ] Én H1 per side (unik og beskrivende)
- [ ] Tittel (`<title>`) og beskrivelse satt via SEO-config
- [ ] Tydelig "Meld deg på" på relevante sider
- [ ] Praktisk info lett å finne
- [ ] Ingen lorem ipsum eller placeholder-tekst

---

## 🟡 Nice to Have (anbefalt)

### Ytelse

- [ ] Hero-bilde optimalisert (LCP < 2.5s)
- [ ] Store bilder vurdert for optimalisering
- [ ] Lighthouse Performance: minimum 85
- [ ] Ingen unødvendige dependencies lastet

### Kvalitet

- [ ] TypeScript type-checking kjører uten feil (`npm run check`)
- [ ] Build kjører uten warnings (`npm run build`)
- [ ] Ingen console.log() i produksjonskode
- [ ] Dead code fjernet

### Testing

- [ ] Testet på Chrome, Firefox og Safari
- [ ] Testet på mobil og desktop
- [ ] Zoom til 200% fungerer (layout ikke ødelagt)
- [ ] Sjekket med screen reader (valgfritt, men verdifullt)

---

## 🔧 CI/CD Validation

Disse kjører automatisk via GitHub Actions:

- [ ] Build lykkes (`npm run build`)
- [ ] Type check lykkes (`npm run check`)
- [ ] Deploy til Domeneshop lykkes

Før du pusher til `main`, kjør lokalt:

```bash
npm run check && npm run build
```

---

## 📱 Manual testing guide

1. **Desktop testing**:
   - Åpne i Chrome, Firefox, Safari (hvis mulig)
   - Bruk kun tastatur (Tab, Enter, Escape)
   - Zoom til 200% med Ctrl/Cmd + +

2. **Mobile testing**:
   - Test på ekte mobil (eller DevTools device mode)
   - Sjekk at touch targets er store nok
   - Sjekk at meny fungerer på mobil

3. **Accessibility testing**:
   - Kjør Lighthouse i Chrome DevTools
   - Sjekk kontrast med WebAIM Contrast Checker
   - Test fokus-rekkefølge med Tab-tasten

4. **i18n testing**:
   - Klikk gjennom hele siden på NO
   - Klikk gjennom hele siden på EN
   - Verifiser at språk-switcher fungerer
