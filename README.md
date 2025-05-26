# 🏃‍♂️ Torghatten Maraton – Offisiell nettside

Dette er kildekoden til den offisielle nettsiden for **Torghatten Maraton**, et løpsarrangement som finner sted ved det ikoniske fjellet med hull i Brønnøy kommune. Nettsiden er bygget for å være rask, universelt utformet, og enkel å vedlikeholde.

---

## 🌍 Live nettsted

👉 [torghattenmaraton.no](https://torghattenmaraton.no)

---

## 🚀 Teknisk oppsett

- **Astro** – moderne statisk sidegenerator
- **Tailwind CSS** – stilrammeverk
- **JSON-baserte datafiler** – for distanser, resultater og feature toggles
- **GitHub Actions + FTP** – automatisk deploy til Domeneshop
- **Feature Toggles** – sentral styring av seksjoner og innhold
- **Språkstøtte** – støtte for norsk og engelsk (under utvikling)

---

## 📁 Mappestruktur

.
├── public/ # Bilder og andre statiske ressurser
├── src/
│ ├── components/ # Gjenbrukbare UI-komponenter
│ ├── data/ # JSON-filer (eks: resultater, topplister)
│ ├── layouts/ # Sideoppsett
│ ├── pages/ # Nettsider (*.astro)
│ ├── config/ # siteConfig.ts, feature toggles og metadata
│ └── styles/ # Globale stilark
├── .github/workflows/ # GitHub Actions for deploy
├── astro.config.mjs # Astro-oppsett
└── package.json # Avhengigheter

---

## 📦 Kom i gang lokalt

```bash
git clone https://github.com/TonyGrimstad/torghatten-astro.git
cd torghatten-astro
npm install
npm run dev
```

## ✅ Feature toggles

Sentralisert styring av innhold og seksjoner (InfoSection, VideoSection, Påmelding, osv.)

Defineres i src/config/siteConfig.ts

```bash
export const featureToggles = {
  infoSection: { enabled: true, from: "2025-01-01", to: "2025-04-30" },
  signupButton: { enabled: true, to: "2025-04-25" },
  raceDate: { enabled: true, text: "26. april 2025" },
};
```

## 🧠 Viktige konsepter

✅ Component-driven – Hver seksjon (Hero, Video, Topp5 osv.) er en selvstendig komponent.

🔧 Toggle-basert innhold – Hver komponent kan slås av/på basert på dato og config.

🎯 Resultater per distanse – JSON-filer for hel-, halvmaraton osv., med gjenbrukbar komponent.

## 🤝 Bidra

Har du innspill, bilder eller forbedringer?
👉 [Opprett et Issue](https://github.com/tonygrimstad/torghatten-astro/issues) eller send en Pull Request.

📄 Lisens & utviklerinfo
© Torghatten Maraton v/ Sport Torghatten Idrettslag

Nettside utviklet og vedlikeholdt av Tony Grimstad

GitHub: github.com/TonyGrimstad/torghatten-astro
