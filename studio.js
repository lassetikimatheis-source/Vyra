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
  // The line follows scroll position; each milestone lights as it is reached.
  const journey = document.querySelector('[data-journey]');
  if (journey) {
    const progress = journey.querySelector('.journey-progress');
    const steps = [...journey.querySelectorAll('.journey-step')];
    const dots = [...journey.querySelectorAll('.journey-dot')];
    const halos = [...journey.querySelectorAll('.journey-halo')];
    let pending = false;
    const drawJourney = () => {
      const box = journey.getBoundingClientRect();
      const ratio = motion.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * .57 - box.top) / box.height));
      progress.style.strokeDashoffset = String(1 - ratio);
      steps.forEach((step, index) => {
        const reached = ratio >= (index + .5) / steps.length;
        step.classList.toggle('is-reached', reached);
        dots[index]?.classList.toggle('is-reached', reached);
        halos[index]?.classList.toggle('is-reached', reached);
      });
      pending = false;
    };
    const scheduleJourney = () => { if (!pending) { pending = true; requestAnimationFrame(drawJourney); } };
    addEventListener('scroll', scheduleJourney, {passive:true});
    addEventListener('resize', scheduleJourney);
    motion.addEventListener('change', drawJourney);
    drawJourney();
  }
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
  // Reveal actual content progressively, without hiding above-the-fold text.
  const revealTargets = [...document.querySelectorAll('.section-lead, .service-grid article, .project-card, .process-grid article, .studio-statement, .faq-section, .studio-cta, .service-list article')];
  let revealObserver;
  const setupReveals = () => {
    revealObserver?.disconnect();
    if (motion.matches || !('IntersectionObserver' in window)) {
      revealTargets.forEach(el => el.classList.remove('motion-waiting'));
      return;
    }
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('motion-waiting');
          entry.target.classList.add('motion-shown');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold: 0.1});
    revealTargets.forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
      if (el.getBoundingClientRect().top > innerHeight * .9) el.classList.add('motion-waiting');
      else el.classList.add('motion-shown');
      revealObserver.observe(el);
    });
  };
  setupReveals();
  motion.addEventListener('change', setupReveals);

  const video = document.querySelector('.studio-hero-video');
  const videoToggle = document.querySelector('.video-toggle');
  if (video && videoToggle) {
    let userPaused = false;
    let manualPlay = false;
    let inView = true;
    const saveData = navigator.connection?.saveData === true;
    const syncVideoButton = () => {
      videoToggle.textContent = video.paused ? 'Video abspielen' : 'Video pausieren';
      videoToggle.setAttribute('aria-pressed', String(!video.paused));
    };
    const startVideo = () => {
      if (!video.getAttribute('src')) { video.preload = 'auto'; video.src = video.dataset.src; video.load(); }
      video.muted = true;
      if (!video.paused) return;
      video.play().then(syncVideoButton).catch(syncVideoButton);
    };
    const refreshPlayback = () => {
      if ((manualPlay || (!motion.matches && !saveData)) && !userPaused && inView && !document.hidden) startVideo();
      else video.pause();
    };
    video.addEventListener('playing', () => { video.classList.add('is-playing'); syncVideoButton(); });
    video.addEventListener('pause', syncVideoButton);
    video.addEventListener('error', () => { video.classList.remove('is-playing'); videoToggle.hidden = true; });
    videoToggle.hidden = false;
    videoToggle.addEventListener('click', () => {
      if (video.paused) { userPaused=false; manualPlay=true; startVideo(); }
      else { userPaused=true; video.pause(); }
    });
    motion.addEventListener('change', () => {
      manualPlay=false;
      if (motion.matches) { video.pause(); video.classList.remove('is-playing'); }
      refreshPlayback();
    });
    document.addEventListener('visibilitychange', refreshPlayback);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        inView=entries[0].isIntersecting;
        refreshPlayback();
      }, {threshold:0.05}).observe(video.closest('.studio-hero'));
    }
    syncVideoButton();
    refreshPlayback();
  }

})();
