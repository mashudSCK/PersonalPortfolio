const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function initNavigation() {
  const navbar = document.querySelector("#navbar");
  const toggle = document.querySelector("#navToggle");
  const menu = document.querySelector("#navMenu");
  const links = [...document.querySelectorAll(".nav-link")];
  let returnFocus = false;

  function setMenu(open, restoreFocus = false) {
    toggle.classList.toggle("active", open);
    menu.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      returnFocus = true;
      links[0]?.focus();
    } else if (restoreFocus && returnFocus) {
      toggle.focus();
      returnFocus = false;
    }
  }

  toggle.addEventListener("click", () =>
    setMenu(!menu.classList.contains("active")),
  );
  links.forEach((link) =>
    link.addEventListener("click", () => setMenu(false, true)),
  );

  document.addEventListener("keydown", (event) => {
    if (!menu.classList.contains("active")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setMenu(false, true);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [toggle, ...menu.querySelectorAll(focusableSelector)];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbar.offsetHeight;
      window.scrollTo({
        top,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) =>
          link.classList.toggle("active", link.hash === `#${entry.target.id}`),
        );
      });
    },
    { rootMargin: "-20% 0px -70% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => sectionObserver.observe(section));

  let scrollFrame;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
        scrollFrame = null;
      });
    },
    { passive: true },
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) setMenu(false);
  });
}
