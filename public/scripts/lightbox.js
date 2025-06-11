const overlay = document.getElementById("lightbox-overlay");
const lightboxImage = document.getElementById("lightbox-image");
let currentIndex = 0;
let allImages = [];

document.querySelectorAll("[data-index]").forEach((img, i) => {
  img.addEventListener("click", () => {
    currentIndex = i;
    allImages = Array.from(document.querySelectorAll("[data-index]")).map(img => img.src.replace("/w_800/", "/w_1600/"));
    showLightbox();
  });
});

function showLightbox() {
  if (overlay && lightboxImage) {
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    lightboxImage.src = allImages[currentIndex];
  }
}

document.getElementById("close-btn")?.addEventListener("click", () => {
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
});

document.getElementById("prev-btn")?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  lightboxImage.src = allImages[currentIndex];
});

document.getElementById("next-btn")?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % allImages.length;
  lightboxImage.src = allImages[currentIndex];
});

let touchStartX = 0;

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // swipe venstre → neste bilde
      document.getElementById("next-btn")?.click();
    } else {
      // swipe høyre → forrige bilde
      document.getElementById("prev-btn")?.click();
    }
  }
}


if (overlay) {
  overlay.addEventListener("touchstart", handleTouchStart);
  overlay.addEventListener("touchend", handleTouchEnd);
}

let touchStartY = 0;

/*function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}*/

function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].clientX;
  const touchEndY = e.changedTouches[0].clientY;
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horisontal swipe
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        document.getElementById("next-btn")?.click();
      } else {
        document.getElementById("prev-btn")?.click();
      }
    }
  } else {
    // Vertikal swipe
    if (diffY > 50) {
      document.getElementById("close-btn")?.click();
    }
  }
}
