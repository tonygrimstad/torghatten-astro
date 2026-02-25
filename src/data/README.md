# Data Directory

This directory contains **structured data** used throughout the Torghatten Maraton website.

---

## 📂 Structure

```
src/data/
├── gallery/              # Gallery JSON files (one per year)
│   ├── TM2015-Gallery.json
│   ├── TM2016-Gallery.json
│   └── ...
├── top5_json/           # Top 5 records per distance
│   ├── halvmaraton.json
│   ├── helmaraton.json
│   ├── minimaraton_36_km.json
│   └── oygaloppen_10_km.json
├── galleriIndex.ts      # Gallery data aggregator
└── README.md            # This file
```

---

## 🖼️ Gallery Data

### Purpose
These JSON files contain **photo metadata** for each year's gallery, including:
- Image URLs
- Photographers
- Descriptions
- Total count

### File Format
Each `gallery/TM{YEAR}-Gallery.json` follows the `GalleryYear` type defined in `src/types/gallery.ts`:

```json
{
  "year": 2025,
  "photographer": "Fotograf Navn",
  "images": [
    {
      "src": "/images/photos/2025/image01.jpg",
      "alt": "Løper i mål"
    }
  ]
}
```

### How to Add a New Year

1. **Create JSON file**: `src/data/gallery/TM{YEAR}-Gallery.json`
2. **Add images** to `public/images/photos/{YEAR}/`
3. **Import in `galleriIndex.ts`**:
   ```typescript
   import tm2026 from "./gallery/TM2026-Gallery.json";
   ```
4. **Add to export array** (order = display order):
   ```typescript
   export const galleriData: GalleryYear[] = [
     tm2015, tm2016, ..., tm2026
   ];
   ```

---

## 🏆 Records Data

### Purpose
These JSON files contain **top 5 results** for each race distance.

### File Format
Each `top5_json/{distance}.json` follows the records type structure:

```json
{
  "K": [
    {
      "navn": "Navn Navnesen",
      "tid": "1:23:45",
      "år": 2024
    }
  ],
  "M": [...]
}
```

- `"K"` = Female (Kvinne)
- `"M"` = Male (Mann)

### How to Update Records

1. **Edit the relevant JSON file** in `src/data/top5_json/`
2. **Ensure format matches** the type definition in `src/types/records.ts`
3. **Save and rebuild** - data is imported at build time

---

## 🔍 Type Safety

All data structures are validated using TypeScript types:

- **Gallery**: `src/types/gallery.ts`
- **Records**: `src/types/records.ts`

If you add invalid data, TypeScript/Astro build will fail with a descriptive error.

---

## 📝 Best Practices

- **Use descriptive alt text** for all gallery images
- **Keep file names consistent**: `TM{YEAR}-Gallery.json`
- **Add new years in chronological order** in `galleriIndex.ts`
- **Validate JSON** before committing (use VS Code's built-in validator)
- **Compress images** before adding to `public/images/photos/`

---

## 🆘 Troubleshooting

**Gallery images not showing?**
- Check image paths in JSON match actual files in `public/images/photos/`
- Verify JSON syntax is valid (no trailing commas, proper quotes)

**Records not updating?**
- Run `npm run build` to regenerate static files
- Check that gender keys are exactly `"K"` and `"M"` (case-sensitive)

**Type errors?**
- Compare your JSON structure to the interfaces in `src/types/`
- Run `npm run check` to see TypeScript errors
