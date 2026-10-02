const storageKey = "theme";
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

function preferredTheme() {
  return (
    localStorage.getItem(storageKey) ||
    (darkModeQuery.matches ? "dark" : "light")
  );
}

function applyTheme(theme, persist = false) {
  document.documentElement.toggleAttribute("data-theme", theme === "dark");
  if (theme === "dark") document.documentElement.dataset.theme = "dark";
  const toggle = document.querySelector("#themeToggle");
  toggle?.setAttribute(
    "aria-label",
    `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
  );
  toggle?.setAttribute("aria-pressed", String(theme === "dark"));
  if (persist) localStorage.setItem(storageKey, theme);
}

export function initTheme() {
  applyTheme(preferredTheme());

  document.querySelector("#themeToggle")?.addEventListener("click", () => {
    const current =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark", true);
  });

  darkModeQuery.addEventListener("change", (event) => {
    if (!localStorage.getItem(storageKey))
      applyTheme(event.matches ? "dark" : "light");
  });
}
