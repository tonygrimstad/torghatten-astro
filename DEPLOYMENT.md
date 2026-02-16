# Deployment til Domeneshop

Dette dokumentet beskriver hvordan nettsiden automatisk deployes til Domeneshop via GitHub Actions og løser Internal Server Error under deployment.

## 🚀 Deployment-prosess

### Automatisk deployment

Når du pusher til `main`-branchen:

1. GitHub Actions starter automatisk
2. Bygger Astro-nettsiden (`npm run build`)
3. Deployer via FTP til Domeneshop
4. Apache server håndterer routing via `.htaccess`

### Løsning for Internal Server Error

Problemet med "Internal Server Error" under deployment er løst via:

1. **`.htaccess`** - Apache URL-rewriting for Astro's directory routing
2. **500.html** - Fallback error-side under deployment
3. **Forbedret deployment timing**

## ⚙️ Teknisk løsning

### Apache-konfigurasjon (`.htaccess`)

Filen `public/.htaccess` håndterer:

- ✅ Redirect fra root (`/`) til `/no/`
- ✅ Directory-basert routing för språk
- ✅ Error handling (500/404)
- ✅ Performance (gzip + caching)

### Error handling

- **500.html** - Vises under deployment/server issues
- **Auto-reload** - Prøver på nytt etter 30 sekunder
- **Brukerinformasjon** - Tydelig kommunikasjon

### Deployment struktur

Filene deployeres til `/www/astro/` via FTP.

Domeneshop har DocumentRoot konfigurert til `/www/astro/` i deres kontrollpanel, vilket gir rena URLs utan `/astro/` synlig för besökare.

## 🔍 Feilsøking

### Internal Server Error

Hvis du fortsatt får "Internal Server Error":

1. **Sjekk at .htaccess er uploadet**:
   - Filen skal være i `/www/astro/.htaccess` på serveren
   - GitHub Actions kopierer den fra `public/.htaccess`

2. **Sjekk deployment logs**:
   - GitHub → Actions → se om upload feiler

3. **Test lokal build**:

   ```bash
   npm run build
   npm run preview  # Test directory routing lokalt
   ```

### Debugging timing-issues

For å redusere deployment downtime:

1. **Fjern `dangerous-clean-slate`** fra GitHub Action
2. **Upload i chunks** ikke alt på en gang
3. **Test på staging** før main deployment

## 🔗 Relaterte filer

- `public/.htaccess` - Apache routing konfigurasjon
- `public/500.html` - Error fallback side
- `.github/workflows/*.yml` - Deployment automation
- `astro.config.mjs` - Astro build settings

---

Løsning implementerat: Februar 2026
