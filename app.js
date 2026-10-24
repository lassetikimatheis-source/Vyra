const config = window.RHYTHM_CONFIG || {};
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const header = document.querySelector(".site-header");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Menü öffnen");
  mobileNav.hidden = true;
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Menü schließen" : "Menü öffnen",
  );
  mobileNav.hidden = !open;
});
mobileNav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (e) => {
  if (e.matches) closeMenu();
});

// TestFlight remains a real link even without JavaScript.
if (config.betaUrl) {
  try {
    const url = new URL(config.betaUrl);
    if (
      url.protocol === "https:" &&
      url.hostname === "testflight.apple.com" &&
      url.pathname.startsWith("/join/")
    ) {
      document.querySelectorAll(".beta-link").forEach((a) => {
        a.href = url.href;
      });
    }
  } catch {
    /* Keep the confirmed HTML fallback. */
  }
}

// Only supplied original images replace placeholders; no recreated app UI.
document.querySelectorAll("[data-screen]").forEach((slot) => {
  const source = config.screenshots?.[slot.dataset.screen];
  if (!source) return;
  let url;
  try {
    url = new URL(source, location.href);
  } catch {
    return;
  }
  if (url.protocol !== "https:" && url.origin !== location.origin) return;
  const figure = slot.closest("figure");
  const caption = figure.querySelector("figcaption");
  const title = caption.textContent.split(" · ")[0];
  const image = new Image();
  image.alt = `Original-Screenshot aus VYRA Rhythm: ${title}`;
  image.width = 1179;
  image.height = 2556;
  image.decoding = "async";
  image.loading = figure.closest(".hero") ? "eager" : "lazy";
  if (slot.dataset.screen === "dashboard") image.fetchPriority = "high";
  image.addEventListener("load", () => {
    slot.querySelector(".screen-placeholder")?.remove();
    caption.textContent = `${title} · VYRA Rhythm`;
    figure.classList.add("has-screenshot");
  });
  image.addEventListener("error", () => image.remove());
  image.src = url.href;
  slot.append(image);
});

document.querySelectorAll("[data-dialog]").forEach((button) => {
  button.addEventListener("click", () =>
    document.getElementById(button.dataset.dialog).showModal(),
  );
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  });
});

const challenges = [
  [
    "Balance",
    "Bring Ernährung, Bewegung und Erholung in einen Rhythmus, der zu dir passt.",
  ],
  [
    "Run Club",
    "Mach Laufen zu deiner Routine – mit persönlichen Wochenzielen und Motivation für den nächsten Schritt.",
  ],
  [
    "Gym Warrior",
    "Gib deinem Krafttraining Struktur und bleib an deinen persönlichen Trainingszielen dran.",
  ],
  [
    "Eat Smart",
    "Lerne deine Ernährung kennen und arbeite an bewussten Essensroutinen.",
  ],
  [
    "Move More",
    "Bring mehr Bewegung in deinen Alltag. Kleine Schritte können der Anfang sein.",
  ],
  [
    "5K Mission",
    "Mach die fünf Kilometer zu deinem persönlichen Ziel und arbeite mit einem individuellen Plan darauf hin.",
  ],
  [
    "HYROX Warrior",
    "Verbinde Kraft und Ausdauer und bring Struktur in deine persönliche HYROX-Vorbereitung.",
  ],
];
document.querySelectorAll("[data-challenge]").forEach((button) =>
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-challenge]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    const [title, description] = challenges[Number(button.dataset.challenge)];
    document.querySelector("#challenge-title").textContent = title;
    document.querySelector("#challenge-description").textContent = description;
  }),
);
const workouts = {
  strength: [
    "Struktur für deine Stärke.",
    "Ober- und Unterkörper, Übungen und Alternativen. Im Trainingsmodus begleiten dich Sätze, Wiederholungen, Gewichte und Pausen.",
  ],
  running: [
    "Dein Lauf. Dein Tempo.",
    "Plane deine Laufeinheiten im Kalender und behalte dein persönliches Ziel im Blick. Schritt für Schritt wird aus deinem Vorhaben eine Routine.",
  ],
  hyrox: [
    "Kraft trifft Ausdauer.",
    "Bring deine Vorbereitung in einen übersichtlichen Plan. Verbinde Kraft und Laufen und behalte deine nächsten Einheiten im Kalender im Blick.",
  ],
};
const trainingTabs = [...document.querySelectorAll("[data-training]")];
trainingTabs.forEach((button, index) => {
  button.addEventListener("click", () => {
    trainingTabs.forEach((b) => {
      b.setAttribute("aria-selected", String(b === button));
      b.tabIndex = b === button ? 0 : -1;
    });
    const data = workouts[button.dataset.training];
    const panel = document.querySelector("#training-panel");
    panel.setAttribute("aria-labelledby", button.id);
    panel.querySelector("h3").textContent = data[0];
    panel.querySelector("p").textContent = data[1];
  });
  button.addEventListener("keydown", (e) => {
    let next;
    if (e.key === "ArrowRight") next = (index + 1) % trainingTabs.length;
    if (e.key === "ArrowLeft")
      next = (index + trainingTabs.length - 1) % trainingTabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = trainingTabs.length - 1;
    if (next !== undefined) {
      e.preventDefault();
      trainingTabs[next].focus();
      trainingTabs[next].click();
    }
  });
});
document.querySelector("#year").textContent = new Date().getFullYear();

const reveals = [...document.querySelectorAll(".reveal")];
let revealObserver;
function setMotion() {
  revealObserver?.disconnect();
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    document.documentElement.classList.remove("js-motion");
    reveals.forEach((el) => el.classList.add("visible"));
    return;
  }
  document.documentElement.classList.add("js-motion");
  revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  reveals
    .filter((el) => !el.classList.contains("visible"))
    .forEach((el) => revealObserver.observe(el));
}
setMotion();
reducedMotion.addEventListener("change", () => {
  setMotion();
  requestScroll();
});

const progress = document.querySelector(".scroll-progress");
const devices = [...document.querySelectorAll("[data-parallax]")];
const mobile = window.matchMedia("(max-width: 760px)");
let ticking = false;
function updateScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle("scrolled", y > 15);
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  if (!reducedMotion.matches && !mobile.matches) {
    for (const device of devices) {
      const rect = device.parentElement.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > innerHeight + 100) continue;
      const offset = Math.max(
        -14,
        Math.min(14, -rect.top * Number(device.dataset.parallax)),
      );
      device.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    }
  } else
    devices.forEach((device) => device.style.removeProperty("--parallax-y"));
  ticking = false;
}
function requestScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateScroll);
  }
}
window.addEventListener("scroll", requestScroll, { passive: true });
window.addEventListener("resize", requestScroll, { passive: true });
updateScroll();
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".desktop-nav a").forEach((a) => {
          if (a.hash === `#${entry.target.id}`)
            a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("#features, #challenges, #tracking, #community, #faq")
    .forEach((s) => navObserver.observe(s));
}
