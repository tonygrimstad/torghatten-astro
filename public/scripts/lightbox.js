const overlay = document.getElementById("lightbox-overlay");
const lightboxImage = document.getElementById("lightbox-image");
let currentIndex = 0;
let allImages = [];

let touchStartX = 0;
let touchStartY = 0;

// Klikk på bilde (thumbnail)
document.querySelectorAll("[data-index]").forEach((img, i) => {
  img.addEventListener("click", () => {
    currentIndex = i;
    allImages = Array.from(document.querySelectorAll("[data-index]")).map(img =>
      img.src.replace("/w_800/", "/w_1600/")
    );
    showLightbox();
  });
});

function showLightbox() {
  if (overlay && lightboxImage) {
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    updateImage();
  }
}

function updateImage() {
  if (!lightboxImage) return;
  lightboxImage.classList.remove("show");
  lightboxImage.onload = () => lightboxImage.classList.add("show");
  lightboxImage.src = allImages[currentIndex];
}

// Lukk lightbox
document.getElementById("close-btn")?.addEventListener("click", () => {
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
});

// Bla til forrige/neste bilde
document.getElementById("prev-btn")?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  updateImage();
});

document.getElementById("next-btn")?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % allImages.length;
  updateImage();
});

// Touch: start
function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}

// Touch: slutt
function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horisontal sveip
    if (Math.abs(diffX) > 50) {
      diffX > 0
        ? document.getElementById("next-btn")?.click()
        : document.getElementById("prev-btn")?.click();
    }
  } else {
    // Vertikal sveip
    if (diffY > 50) {
      document.getElementById("close-btn")?.click();
    }
  }
}

if (overlay) {
  overlay.addEventListener("touchstart", handleTouchStart);
  overlay.addEventListener("touchend", handleTouchEnd);
}
