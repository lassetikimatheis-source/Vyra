(() => {
  const header = document.querySelector(".studio-header");
  const button = document.querySelector(".studio-menu");
  const menu = document.querySelector("#studio-mobile");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const close = () => {
    if (!button || !menu) return;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Menü öffnen");
    menu.hidden = true;
  };
  button?.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    menu.hidden = !open;
  });
  menu
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu && !menu.hidden) {
      close();
      button.focus();
    }
  });
  matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) close();
  });
  document
    .querySelectorAll("[data-year]")
    .forEach((el) => (el.textContent = String(new Date().getFullYear())));
  let scheduled = false;
  const paint = () => {
    header?.classList.toggle("is-scrolled", scrollY > 24);
    scheduled = false;
  };
  addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(paint);
      }
    },
    { passive: true },
  );
  paint();
  const strip = document.querySelector("[data-client-strip]");
  const toggle = document.querySelector(".ticker-toggle");
  if (
    strip &&
    Array.isArray(window.VYRA_CLIENTS) &&
    window.VYRA_CLIENTS.length
  ) {
    const track = document.createElement("div");
    track.className = "logo-track";
    for (let copy = 0; copy < 2; copy++) {
      const group = document.createElement("div");
      group.className = "logo-group";
      if (copy) group.setAttribute("aria-hidden", "true");
      window.VYRA_CLIENTS.forEach((client) => {
        const destination = client.project || client.website;
        const link = document.createElement(destination ? "a" : "span");
        if (destination) link.href = destination;
        link.className = "client-logo";
        if (copy) link.tabIndex = -1;
        const image = document.createElement("img");
        image.src = client.logo;
        image.alt = copy ? "" : client.name;
        image.width = 260;
        image.height = 90;
        link.append(image);
        group.append(link);
      });
      track.append(group);
    }
    strip.replaceChildren(track);
    let paused = false;
    const apply = () => {
      strip.classList.toggle("is-moving", !motion.matches);
      strip.classList.toggle("is-paused", paused);
      if (toggle) {
        toggle.hidden = motion.matches;
        toggle.setAttribute("aria-pressed", String(paused));
        toggle.textContent = paused
          ? "Animation fortsetzen"
          : "Animation pausieren";
      }
    };
    toggle?.addEventListener("click", () => {
      paused = !paused;
      apply();
    });
    motion.addEventListener("change", apply);
    apply();
  }
})();
