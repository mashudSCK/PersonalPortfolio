import { achievements, projects, skillGroups } from "./content.js";

const githubIcon =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>';
const externalIcon =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';

function projectTemplate(project, index) {
  const demo = project.demo
    ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">${externalIcon}<span>Live project</span></a>`
    : "";

  const visual = project.image
    ? `<img src="${project.image}" srcset="${project.srcset}" sizes="(min-width: 900px) 48vw, 100vw" alt="${project.alt}" class="project-image" width="${project.width}" height="${project.height}" loading="lazy" decoding="async">`
    : `<div class="project-illustration" role="img" aria-label="${project.alt}">
        <span class="task-line is-done"></span>
        <span class="task-line"></span>
        <span class="task-line"></span>
        <strong>Do your tasks pls.</strong>
      </div>`;

  const priority = index < 3 ? "project-featured" : "project-secondary";

  return `<article class="project-card ${priority}">
        <div class="project-image-wrapper">
            ${visual}
        </div>
        <div class="project-content">
            <p class="project-index">Build ${String(index + 1).padStart(2, "0")} · ${project.role}</p>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${project.technologies.map((technology) => `<span class="tech-tag">${technology}</span>`).join("")}</div>
            <details class="project-story"><summary>Read the build notes</summary><div class="project-story-content"><p class="project-note"><strong>What stayed with me:</strong> ${project.note}</p>${project.story.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div></details>
            <div class="project-links">
                <a href="${project.repository}" target="_blank" rel="noopener noreferrer" class="project-link">${githubIcon}<span>Source code</span></a>
                ${demo}
            </div>
        </div>
    </article>`;
}

function skillTemplate(group) {
  return `<article class="skills-card">
        <div class="skills-card-header"><span class="skills-icon"><i class="fa-solid ${group.icon}" aria-hidden="true"></i></span><h3>${group.title}</h3></div>
        <div class="skills-tags">${group.items.map((item) => `<span class="skill-tag">${item}</span>`).join("")}</div>
    </article>`;
}

function achievementTemplate(achievement) {
  const visual = achievement.image
    ? `<img src="${achievement.image}" srcset="${achievement.srcset}" sizes="56px" alt="${achievement.imageAlt}" width="${achievement.width}" height="${achievement.height}" loading="lazy" decoding="async">`
    : `<i class="${achievement.icon}" aria-hidden="true"></i>`;

  return `<article class="achievement-card">
        <div class="achievement-icon">${visual}</div>
        <h3>${achievement.title}</h3><p>${achievement.description}</p><span class="achievement-date">${achievement.date}</span>
    </article>`;
}

export function renderPortfolioContent() {
  document.querySelector("#projectsGrid").innerHTML = projects
    .map(projectTemplate)
    .join("");
  document.querySelector("#skillsGrid").innerHTML = skillGroups
    .map(skillTemplate)
    .join("");
  document.querySelector("#achievementsGrid").innerHTML = achievements
    .map(achievementTemplate)
    .join("");
}
