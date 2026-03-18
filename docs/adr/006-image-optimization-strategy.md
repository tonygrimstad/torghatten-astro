# ADR 006: Image Optimization Strategy

**Status:** Accepted
**Date:** 2026-02-25
**Deciders:** Development Team
**Technical Story:** Performance optimization - Lighthouse LCP improvement

---

## Context and Problem Statement

The website currently uses unoptimized images directly from `public/` directory, resulting in:

1. **Performance issues:**
   - Large hero images (500KB-2MB) loaded without optimization
   - No responsive image sizing (same large image served to mobile and desktop)
   - No modern format support (WebP, AVIF)
   - Gallery contains 300+ unoptimized JPG files

2. **LCP (Largest Contentful Paint) impact:**
   - Hero images are typically the LCP element
   - Current LCP: ~2.5-4s on 3G connections
   - Target: <2.5s (Lighthouse 100 Performance)

3. **Current implementation:**
   - Hero backgrounds: CSS `url()` - cannot be optimized by Astro
   - Gallery images: Static `<img>` tags with `loading="lazy"`
   - No `astro:assets` usage anywhere in codebase

**Question:** How should we optimize images to improve performance while maintaining development simplicity?

---

## Decision Drivers

- **Performance:** Improve Lighthouse score and real-world load times
- **User Experience:** Faster page loads, especially on mobile
- **Maintainability:** Solution should be easy to maintain and extend
- **Progressive Enhancement:** Don't break existing functionality during migration
- **Developer Experience:** Keep image handling simple and intuitive

---

## Considered Options

### Option 1: Full migration to `astro:assets` everywhere
**Pros:**
- Maximum optimization potential
- Consistent approach across entire site
- Best long-term solution

**Cons:**
- Large upfront work (300+ gallery images)
- Risk of breaking existing functionality
- Complex migration for CSS background images

### Option 2: Keep everything as-is (status quo)
**Pros:**
- No work required
- No risk of breaking changes

**Cons:**
- Poor performance continues
- Falling behind best practices
- Lower Lighthouse scores

### Option 3: Pragmatic incremental approach (CHOSEN)
**Pros:**
- Immediate impact on most important images
- Low risk (incremental changes)
- Learn and adapt as we go
- Can measure improvement at each step

**Cons:**
- Mixed approach (some optimized, some not)
- Takes longer to complete full migration

---

## Decision Outcome

**Chosen option:** Option 3 - Pragmatic incremental approach

**Implementation strategy:**

### Phase 1: Critical Hero Images (HIGH PRIORITY)
- **Target:** Main hero backgrounds that affect LCP
- **Approach:** Convert from CSS backgrounds to `<Image>` component
- **Files affected:**
  - `HeroSection.astro` - main hero (`/herosek-tmbru.jpg`)
  - `GalleryPage.astro` - gallery hero (8 random images)

**Expected impact:** LCP improvement 30-40%, Lighthouse Performance +10-15 points

### Phase 2: Large Static Images (MEDIUM PRIORITY)
- **Target:** Large content images (omoss, race profiles, etc.)
- **Approach:** Use `<Image>` component with responsive sizing
- **Files affected:**
  - `OmossPage.astro` - 3 large images
  - `RaceProfile.astro` - profile images
  - `HeroSectionDistanse.astro` - distance-specific heroes

**Expected impact:** Overall page weight reduction 40-50%

### Phase 3: Gallery Optimization (LONG-TERM)
- **Target:** 300+ gallery images in `/public/images/photos/`
- **Approach:**
  - Keep original JPGs in `public/` for backward compatibility
  - Generate optimized thumbnails on build
  - Use responsive loading in lightbox
- **Consideration:** May need CDN (Cloudinary) for best results

**Expected impact:** Gallery load time reduction 50-60%

### Phase 4: Sponsor Logos & Small Assets (LOW PRIORITY)
- **Target:** Logos, icons, small decorative images
- **Approach:** Evaluate case-by-case (many are fine as-is)

---

## Technical Implementation

### Converting CSS Background to `<Image>`

**Before (current CSS approach):**
```astro
<section class="bg-[url('/herosek-tmbru.jpg')] bg-cover bg-center">
```

**After (optimized approach):**
```astro
---
import { Image } from "astro:assets";
import heroImg from "../assets/herosek-tmbru.jpg";
---

<section class="relative">
  <Image
    src={heroImg}
    alt=""
    class="absolute inset-0 w-full h-full object-cover object-center"
    widths={[640, 768, 1024, 1280, 1920]}
    sizes="100vw"
    loading="eager"
    fetchpriority="high"
  />
  <div class="relative z-10">
    <!-- Content -->
  </div>
</section>
```

### Image Organization

**New structure:**
```
src/
  assets/
    hero/
      herosek-tmbru.jpg       # Main hero (also in public/ for compatibility)
      gallery-hero-1.jpg      # Gallery random images
      ...
    content/
      omoss-*.jpg             # Content images
      race-profile-*.jpg
public/
  herosek-tmbru.jpg           # Copy for build compatibility (Astro requirement)
  images/                     # Legacy (to be migrated)
    photos/                   # Gallery (300+ images - long-term)
    logos/                    # Small assets (low priority)
    sponsors/                 # Sponsor logos (evaluate)
```

---

## Pros and Cons of the Decision

### Positive Consequences

- ✅ **Immediate LCP improvement** from Phase 1
- ✅ **Lower risk** than full rewrite
- ✅ **Learn and iterate** - can adjust strategy based on results
- ✅ **Measurable progress** - can track Lighthouse scores after each phase
- ✅ **Modern formats** - WebP/AVIF support for newer browsers
- ✅ **Responsive images** - appropriate sizes for mobile/desktop

### Negative Consequences

- ⚠️ **Mixed approach** - some images optimized, some not (temporarily)
- ⚠️ **Migration effort** - will take multiple iterations to complete
- ⚠️ **Bundle size** - images in `src/assets/` increase build time
- ⚠️ **Gallery complexity** - 300+ images need careful planning

---

## Validation

### Success Metrics

**Phase 1 targets:**
- Lighthouse Performance: 90+ (currently ~75-80)
- LCP: <2.5s on 3G (currently ~3-4s)
- Hero image size: <300KB (currently 500KB-2MB)

**Overall targets:**
- Lighthouse Performance: 95+
- Total page weight reduction: 40-50%
- Mobile load time: <3s on 3G

### Testing Strategy

After each phase:
1. Run Lighthouse audit (desktop + mobile)
2. Test on real devices (slow 3G simulation)
3. Verify no visual regressions
4. Check build time impact

---

## Implementation Plan

See companion document: `docs/development/image-optimization-plan.md`

**Priority order:**
1. ✅ **Week 1-2:** Phase 1 - Hero images (HeroSection, GalleryPage)
2. 📅 **Week 3-4:** Phase 2 - Large content images
3. 📅 **Month 2-3:** Phase 3 - Gallery optimization (evaluate CDN)
4. 📅 **As needed:** Phase 4 - Small assets

---

## Links and References

- [Astro Assets Documentation](https://docs.astro.build/en/guides/images/)
- [Web.dev: Optimize LCP](https://web.dev/optimize-lcp/)
- [docs/standards/images.md](../standards/images.md) - Internal image policy
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)

---

## Notes

- **Alternative considered:** Cloudinary CDN for all images - rejected for Phase 1 due to complexity, but may revisit for Phase 3 (gallery)
- **Build time impact:** Optimizing 10-20 hero images adds ~10-20s to build time - acceptable trade-off
- **Backward compatibility:** Keep original images in `public/` during migration for rollback safety
