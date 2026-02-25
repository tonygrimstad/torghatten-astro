# Image Optimization Implementation Plan

**Status:** In Progress
**Related:** ADR 006 - Image Optimization Strategy
**Owner:** Development Team
**Target:** Q1 2026

---

## Executive Summary

This plan outlines the step-by-step process for migrating from unoptimized static images to Astro's optimized image system. The work is divided into 4 phases, prioritized by performance impact.

**Current state:**
- ❌ No `astro:assets` usage
- ❌ Large unoptimized images (500KB-2MB)
- ❌ CSS background images (cannot be optimized)
- ❌ No responsive sizing

**Target state:**
- ✅ Critical hero images optimized
- ✅ Responsive image sizing
- ✅ WebP/AVIF modern formats
- ✅ Lighthouse Performance 95+

---

## Phase 1: Critical Hero Images ⚡ HIGH PRIORITY

**Goal:** Optimize the most impactful images that affect LCP

### 1.1 Main Hero (HeroSection.astro)

**Current implementation:**
```astro
<section class="bg-[url('/herosek-tmbru.jpg')] bg-cover bg-center bg-fixed">
```

**Issues:**
- CSS background cannot be optimized by Astro
- Full size image loaded even on mobile
- No modern format support
- Image size: ~1.5MB

**Migration steps:**

1. **Move image to src/assets:**
   ```bash
   mkdir -p src/assets/hero
   cp public/herosek-tmbru.jpg src/assets/hero/
   ```

2. **Update HeroSection.astro:**
   ```astro
   ---
   import { Image } from "astro:assets";
   import heroImg from "../assets/hero/herosek-tmbru.jpg";
   // ... other imports
   ---

   <section class="relative min-h-screen text-white flex flex-col">
     <!-- Background Image -->
     <Image
       src={heroImg}
       alt=""
       class="absolute inset-0 w-full h-full object-cover object-center -z-10"
       widths={[640, 768, 1024, 1280, 1920]}
       sizes="100vw"
       loading="eager"
       fetchpriority="high"
       quality={85}
     />

     <!-- Overlay -->
     <div class="absolute inset-0 bg-gradient-to-br from-black/30 via-black/40 to-black/60 z-0"></div>

     <!-- Content (existing) -->
     <div class="relative z-10 ...">
       <!-- Existing content -->
     </div>
   </section>
   ```

3. **Remove CSS background utility:**
   - Delete `bg-[url('/herosek-tmbru.jpg')]`
   - Keep `bg-fixed` effect by using CSS if needed

4. **Test:**
   - [ ] Visual regression check (desktop)
   - [ ] Visual regression check (mobile)
   - [ ] Lighthouse audit (before/after)
   - [ ] Check network tab for WebP generation
   - [ ] Verify `fetchpriority="high"` is applied

**Expected impact:**
- Image size: 1.5MB → 300KB (80% reduction)
- LCP: 3.5s → 2.0s (43% improvement)
- Lighthouse Performance: +10-15 points

---

### 1.2 Gallery Hero Random Backgrounds (GalleryPage.astro)

**Current implementation:**
```javascript
const heroImages = [
  "/images/banner/cropped-torghatten20150217-1.jpg",
  "/images/banner/cropped-i-SmkP5Tb.jpg",
  // ... 6 more
];
const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];
heroSection.style.backgroundImage = `url('${randomImage}')`;
```

**Issues:**
- JavaScript-loaded backgrounds (no optimization)
- 8 large images loaded randomly
- No caching benefit
- No responsive sizing

**Migration strategy - Option A (Recommended): Pre-selected on build**

1. **Move images to src/assets:**
   ```bash
   mkdir -p src/assets/gallery-hero
   cp public/images/banner/cropped-*.jpg src/assets/gallery-hero/
   cp public/images/banner/30mai-*.jpg src/assets/gallery-hero/
   ```

2. **Create random selection on BUILD (not runtime):**
   ```astro
   ---
   import { Image } from "astro:assets";
   import hero1 from "../assets/gallery-hero/cropped-torghatten20150217-1.jpg";
   import hero2 from "../assets/gallery-hero/cropped-i-SmkP5Tb.jpg";
   // ... import all 8

   const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8];
   const selectedHero = heroImages[Math.floor(Math.random() * heroImages.length)];
   ---

   <section class="relative min-h-[60vh] md:min-h-[70vh]">
     <Image
       src={selectedHero}
       alt=""
       class="absolute inset-0 w-full h-full object-cover object-center -z-10"
       widths={[640, 768, 1024, 1280]}
       sizes="100vw"
       loading="eager"
       quality={85}
     />

     <!-- Gradient overlay and content (existing) -->
   </section>
   ```

3. **Remove JavaScript random selection:**
   - Delete entire `<script>` block in GalleryPage.astro

**Pros:**
- Only 1 image loaded per build (not 8)
- Full optimization
- No JavaScript needed

**Cons:**
- Same image until next build (acceptable for static site)

**Alternative Option B:** Keep dynamic selection by loading all 8 optimized:
- Use all 8 optimized images
- Select with JavaScript
- Each image ~200KB instead of 1MB (still loads 1 random)

**Expected impact:**
- Image size: 1-2MB → 200-300KB per load
- Page load: Faster by ~1-1.5s
- No JavaScript execution for image loading

---

### 1.3 Distance-Specific Heroes (if applicable)

**Target files:**
- `HeroSectionDistanse.astro` (if it uses custom backgrounds)

**Same approach as 1.1 above**

---

## Phase 2: Large Content Images 📄 MEDIUM PRIORITY

**Timeline:** Week 3-4

### 2.1 Om Oss Page Images (OmossPage.astro)

**Current:**
```astro
<img src="/images/..." alt="..." />
```

**Migration:**
```astro
---
import { Image } from "astro:assets";
import omossImg1 from "../assets/content/omoss-hero.jpg";
---

<Image
  src={omossImg1}
  alt="Beskrivende alt-tekst"
  widths={[400, 600, 800]}
  sizes="(max-width: 768px) 100vw, 600px"
  loading="lazy"
/>
```

**Files to migrate:**
- 3 large images in OmossPage
- Add responsive sizing
- Use `loading="lazy"` (below fold)

---

### 2.2 Race Profile Images (RaceProfile.astro)

**Current:**
```astro
<img src={profileImg} loading="lazy" />
```

**Migration:**
```astro
<Image
  src={profileImg}
  widths={[300, 450, 600]}
  sizes="(max-width: 640px) 300px, 450px"
  loading="lazy"
/>
```

---

### 2.3 Other Content Images

Audit and migrate:
- `LiveScroll.astro` - sponsor logos (if large)
- Any other large content images

**Priority:** Only images >100KB

---

## Phase 3: Gallery Optimization 🖼️ LONG-TERM

**Timeline:** Month 2-3
**Complexity:** High (300+ images)

### 3.1 Analysis & Strategy Decision

**Current state:**
- 300+ unoptimized JPG files
- Located in `public/images/photos/TM20XX/`
- Loaded dynamically by FSLightbox

**Options to evaluate:**

#### Option A: Build-time optimization (Astro)
**Approach:**
- Move all to `src/assets/gallery/`
- Generate thumbnails + full size on build
- Use `<Image>` for thumbnails, optimize full-size

**Pros:**
- No external dependencies
- Full control
- One-time build cost

**Cons:**
- Build time: +5-10 minutes (300 images)
- Large bundle size
- Not suitable for frequently changing galleries

#### Option B: CDN (Cloudinary)
**Approach:**
- Upload originals to Cloudinary
- Use Cloudinary URLs with transformations
- On-the-fly resizing and optimization

**Pros:**
- Fast builds (no processing)
- Dynamic transformations
- Easy to add new images
- Already evaluated (used before - see decisions.md)

**Cons:**
- External dependency
- Monthly cost (estimate: $20-50/month)
- Requires API integration

#### Option C: Hybrid
**Approach:**
- Keep originals in `public/` (backward compatibility)
- Generate optimized thumbnails in `src/assets/`
- Full-size on-demand from `public/` or CDN

**Recommendation:** Option B (Cloudinary) for gallery
- Gallery is dynamic (new photos each year)
- Build time impact too high for Astro processing
- Cloudinary provides best UX (progressive loading, blur-up)

---

### 3.2 Gallery Implementation (if Cloudinary chosen)

1. **Setup Cloudinary account**
2. **Upload existing photos** (bulk upload)
3. **Update `galleriData` structure:**
   ```typescript
   photos: [
     {
       src: "https://res.cloudinary.com/.../v1/TM2025/photo1.jpg",
       thumbnail: "https://res.cloudinary.com/.../c_thumb,w_400/.../photo1.jpg",
       title: "...",
       alt: "..."
     }
   ]
   ```
4. **Update LightboxGallery.astro** to use Cloudinary URLs

**Expected impact:**
- Thumbnail size: 800KB → 50-100KB (90% reduction)
- Gallery load time: 10s → 2-3s
- Progressive loading with blur-up

---

## Phase 4: Small Assets & Logos 🎨 LOW PRIORITY

**Timeline:** As needed

**Evaluate case-by-case:**
- Sponsor logos (many are already small PNG/SVG)
- Icons and decorative elements
- Favicon variations

**Rule of thumb:**
- Files <50KB: Keep as-is in `public/`
- Files 50-200KB: Consider optimization
- Files >200KB: Migrate to `astro:assets`

---

## Testing & Validation Checklist

### Per-Phase Testing

After each image migration:

**Visual Regression:**
- [ ] Desktop view (Chrome, Firefox, Safari)
- [ ] Mobile view (DevTools + real device)
- [ ] Tablet view
- [ ] Check all breakpoints (sm, md, lg, xl)

**Performance:**
- [ ] Lighthouse audit (Desktop) - before/after scores
- [ ] Lighthouse audit (Mobile) - before/after scores
- [ ] WebPageTest (3G Fast) - LCP measurement
- [ ] Check Network tab for WebP/AVIF formats
- [ ] Verify correct image sizes loaded per breakpoint

**Functionality:**
- [ ] Images load correctly
- [ ] Alt text preserved
- [ ] Lazy loading works (below fold)
- [ ] `fetchpriority="high"` on LCP candidates
- [ ] No broken images
- [ ] Gallery lightbox works (Phase 3)

**Build:**
- [ ] Build completes successfully
- [ ] Build time impact acceptable (<30s increase)
- [ ] Deployment successful

---

## Rollback Plan

**If issues occur:**

1. **Keep originals in `public/`** during migration (don't delete)
2. **Git revert** if build fails
3. **Quick rollback:**
   ```astro
   <!-- Temporary rollback to static image -->
   <img src="/herosek-tmbru.jpg" alt="" />
   ```

---

## Success Metrics & Targets

### Phase 1 (Hero images)
- **LCP:** <2.5s (currently ~3-4s)
- **Hero image size:** <300KB (currently 1-2MB)
- **Lighthouse Performance:** 90+ (currently 75-80)

### Phase 2 (Content images)
- **Total page weight:** -40% reduction
- **Time to Interactive:** <3s

### Phase 3 (Gallery)
- **Gallery load time:** <3s for thumbnails
- **Thumbnail sizes:** 50-100KB each
- **Lighthouse Performance:** 95+

### Overall Target
- **Lighthouse Performance:** 95+ (desktop), 90+ (mobile)
- **LCP:** <2.5s on Fast 3G
- **Total page weight:** -50% reduction
- **Build time:** <2 minutes (acceptable)

---

## Resources & References

- [Astro Image Optimization](https://docs.astro.build/en/guides/images/)
- [Web.dev: Optimize Images](https://web.dev/fast/#optimize-your-images)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [ADR 006](../adr/006-image-optimization-strategy.md)

---

## Next Actions

**Immediate (This week):**
1. ✅ Create ADR 006
2. ✅ Create this implementation plan
3. ⏭️ **Next:** Start Phase 1.1 - Optimize main hero image
4. ⏭️ Measure baseline Lighthouse scores

**Week 1-2:**
- Implement Phase 1 (hero images)
- Document results and learnings

**Week 3-4:**
- Implement Phase 2 (content images)
- Re-evaluate Phase 3 strategy based on Phase 1-2 results

---

**Last updated:** 2026-02-25
**Status:** Ready to start Phase 1
