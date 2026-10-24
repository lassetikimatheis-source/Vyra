(() => {
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const tilts = [...document.querySelectorAll("[data-tilt], [data-depth]")];
  const scene = document.querySelector("[data-depth]");
  const header = document.querySelector(".site-header");
  let frame = 0;
  const positions = new Map();
  function paint() {
    frame = 0;
    if (motion.matches) return;
    positions.forEach((point, element) => {
      element.style.setProperty("--tilt-x", `${point.y * -4}deg`);
      element.style.setProperty("--tilt-y", `${point.x * 5}deg`);
      element.style.setProperty("--light-x", `${50 + point.x * 40}%`);
      element.style.setProperty("--light-y", `${50 + point.y * 40}%`);
    });
    if (scene && innerWidth > 680) {
      const progress = Math.min(1, scrollY / Math.max(1, innerHeight));
      scene.style.setProperty("--scene-shift", `${progress * 48}px`);
      scene.style.setProperty("--scene-scale", `${1 - progress * 0.045}`);
    }
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }
  for (const element of tilts) {
    element.addEventListener(
      "pointermove",
      (event) => {
        if (motion.matches || !fine.matches) return;
        const box = element.getBoundingClientRect();
        positions.set(element, {
          x: (event.clientX - box.left) / box.width - 0.5,
          y: (event.clientY - box.top) / box.height - 0.5,
        });
        schedule();
      },
      { passive: true },
    );
    element.addEventListener("pointerleave", () => {
      positions.set(element, { x: 0, y: 0 });
      schedule();
    });
  }
  window.addEventListener("scroll", schedule, { passive: true });
  motion.addEventListener("change", () => {
    if (motion.matches) {
      tilts.forEach((element) =>
        ["--tilt-x", "--tilt-y", "--scene-shift", "--scene-scale"].forEach(
          (key) => element.style.removeProperty(key),
        ),
      );
    } else schedule();
  });
  document.querySelectorAll(".nav-discover").forEach((menu) => {
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) menu.open = false;
    });
    menu.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 },
    );
    document
      .querySelectorAll(
        ".discovery-card,.feature-story,.catalog-card,.journey article,.challenge-monument",
      )
      .forEach((element) => observer.observe(element));
  }
  schedule();
})();
