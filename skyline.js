const video = document.querySelector("#skyline-video");
const skyline = video.closest(".skyline");
const toggle = document.querySelector(".skyline-toggle");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

video.addEventListener("loadeddata", () => {
  skyline.hidden = false;
  toggle.hidden = false;
  if (!reducedMotion.matches) video.play().catch(() => {});
}, { once: true });

toggle.addEventListener("click", () => {
  if (video.paused) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
});
video.addEventListener("play", () => { toggle.textContent = "Video pausieren"; });
video.addEventListener("pause", () => { toggle.textContent = "Video abspielen"; });
video.addEventListener("error", () => {
  skyline.hidden = true;
  toggle.hidden = true;
});
reducedMotion.addEventListener("change", ({ matches }) => {
  if (matches) video.pause();
});
video.preload = "auto";
video.load();
