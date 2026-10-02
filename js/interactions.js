export function initInteractions() {
  const grid = document.querySelector("#projectsGrid");
  const toggle = document.querySelector("#projectsToggle");
  const secondaryProjects = grid?.querySelectorAll(".project-secondary") ?? [];

  if (!grid || !toggle || secondaryProjects.length === 0) return;

  grid.classList.add("is-collapsed");
  toggle.hidden = false;
  toggle.textContent = `Show ${secondaryProjects.length} more projects`;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    grid.classList.toggle("is-collapsed", expanded);
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.textContent = expanded
      ? `Show ${secondaryProjects.length} more projects`
      : "Show fewer projects";
  });
}
