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
