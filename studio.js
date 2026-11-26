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
  document.querySelectorAll('[data-process-explorer]').forEach(explorer => {
    const tabList = explorer.querySelector('[role="tablist"]');
    const tabs = [...tabList.querySelectorAll('[role="tab"]')];
    const panels = [...explorer.querySelectorAll('[role="tabpanel"]')];
    const controls = explorer.querySelector('.process-controls');
    const previous = controls.querySelector('[data-process-prev]');
    const next = controls.querySelector('[data-process-next]');
    const position = controls.querySelector('[data-process-position]');
    let current = 0;
    const select = (index, focus = false) => {
      current = Math.max(0, Math.min(tabs.length - 1, index));
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === current));
        tab.tabIndex = i === current ? 0 : -1;
        panels[i].hidden = i !== current;
      });
      previous.disabled = current === 0;
      next.disabled = current === tabs.length - 1;
      position.textContent = `${current + 1} von ${tabs.length}`;
      if (focus) tabs[current].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (current + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (current - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target !== undefined) { event.preventDefault(); select(target, true); }
      });
    });
    previous.addEventListener('click', () => select(current - 1));
    next.addEventListener('click', () => select(current + 1));
    select(0); tabList.hidden = false; controls.hidden = false;
    explorer.classList.add('is-enhanced');
  });
  const previewDialog = document.querySelector('.rhythm-preview-dialog');
  if (previewDialog && typeof previewDialog.showModal === 'function') {
    document.querySelector('[data-open-rhythm-preview]')?.addEventListener('click', event => {
      event.preventDefault(); previewDialog.showModal();
    });
    previewDialog.querySelector('[data-close-rhythm-preview]').addEventListener('click', () => previewDialog.close());
    previewDialog.addEventListener('click', event => { if (event.target === previewDialog) previewDialog.close(); });
  }
  const strip = document.querySelector('[data-client-strip]');
  if (strip && Array.isArray(window.VYRA_CLIENTS) && window.VYRA_CLIENTS.length) {
    const group = document.createElement('div');
    group.className = 'client-logos';
    window.VYRA_CLIENTS.forEach(client => {
      const destination = client.project || client.website;
      const link = document.createElement(destination ? 'a' : 'span');
      if (destination) link.href = destination;
      link.className = 'client-logo';
      const image = document.createElement('img');
      image.src = client.logo; image.alt = client.name;
      image.width = 260; image.height = 90;
      link.append(image); group.append(link);
    });
    strip.replaceChildren(group);
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
