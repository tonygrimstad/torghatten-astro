# Deployment til Domeneshop

Dette dokumentet beskriver hvordan nettsiden automatisk deployes til Domeneshop via GitHub Actions.

## 🚀 Deployment-prosess

### Automatisk deployment

Når du pusher til `main`-branchen:

1. GitHub Actions starter automatisk
2. Bygger Astro-nettsiden (`npm run build`)
3. Deployer via FTP til Domeneshop (filer skrives over, ikke slettet først)
4. Apache server håndterer routing via `.htaccess`

**Forbedring:** `dangerous-clean-slate` er fjernet for å minimere downtime under deployment.

## 🛠️ Maintenance Mode (Vedlikeholdsmodus)

For å vise en vedlikeholdsside under større oppdateringer:

### Aktivere maintenance mode:

1. Åpne WinSCP og koble til `ftp.domeneshop.no`
2. Naviger til `/www/astro/`
3. Opprett en **tom fil** med navn `.maintenance` (høyreklikk → New → File)
4. Alle besøkende ser nå vedlikeholdssiden med automatisk reload

### Deaktivere maintenance mode:

1. Åpne WinSCP
2. Naviger til `/www/astro/`
3. Slett filen `.maintenance`
4. Nettsiden er umiddelbart tilgjengelig igjen

**Hvordan det fungerer:**
- `maintenance.html` deployeras automatiskt från `public/maintenance.html`
- `.maintenance` är en tom flaggfil du skapar manuellt via FTP
- Når `.maintenance` finnes, vises `maintenance.html` för alla besökande
- Filen `.maintenance` ignoreres av GitHub Actions deployment

## ⚙️ Teknisk løsning

### Apache-konfigurasjon (`.htaccess`)

Filen `public/.htaccess` håndterer:

- ✅ **Maintenance mode** - Automatisk redirect til vedlikeholdsside hvis `.maintenance` finnes
- ✅ **Sikkerhet** - `Options -Indexes` forhindrer directory listing
- ✅ Redirect fra root (`/`) til `/no/`
- ✅ Directory-basert routing för språk
- ✅ Error handling (403/404/500/503)
- ✅ Performance (gzip + caching)

### Error handling

- **500.html** - Vises under deployment/server issues
- **Auto-reload** - Prøver på nytt etter 30 sekunder
- **Brukerinformasjon** - Tydelig kommunikasjon

**Viktig:** For at 500.html skal vises under deployment, må den ligge **utenfor** `/www/astro/`:

1. Last ned `public/500.html` fra prosjektet
2. Logg inn på FTP (WinSCP til ftp.domeneshop.no)
3. Last opp `500.html` til `/www/500.html` (IKKE i astro-mappen)
4. Dette sikrer at feilsida alltid finnes, selv når `/www/astro/` tømmes under deployment

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
