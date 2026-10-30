import PocketRunner from "@/components/PocketRunner";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Code,
  GameController,
  BookOpen,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { projects, skillGroups, achievements } from "@/data/content";
import { profile } from "@/data/profile";
import { projectAnnotations } from "@/data/projectAnnotations";
import { motionReduced } from "@/lib/a11y";
import contactMarkup from "@/data/contact-form.json";

const Arrow = () => <ArrowUpRight size={20} aria-hidden="true" />;
const tools = [
  "React / Next.js",
  "TypeScript",
  "Node.js",
  "Flutter",
  "PHP",
  "MySQL",
  "Git",
];
const absoluteImage = (image?: string) =>
  image || "/images/mashud-tired-developer.png";

function PageHead({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `${title} · Mashud Khalid`;
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        `https://mashudkhalid.vercel.app${pathname === "/" ? "/" : pathname}`,
      );
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute(
        "content",
        `https://mashudkhalid.vercel.app${pathname === "/" ? "/" : pathname}`,
      );
    const heading = document.querySelector<HTMLElement>("h1");
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [title, pathname]);
  return (
    <header className="workshop-head">
      <h1 tabIndex={-1}>{title}</h1>
      <p>{children}</p>
    </header>
  );
}

export function Home() {
  const navigate = useNavigate();
  const openShared = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    target: string,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (
      !document.startViewTransition ||
      motionReduced() ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    event.preventDefault();
    const root = document.documentElement;
    root.dataset.showcaseTransition = target;
    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => navigate(path));
      });
      const cleanup = () => {
        delete root.dataset.showcaseTransition;
      };
      void transition.finished.then(cleanup, cleanup);
    } catch {
      delete root.dataset.showcaseTransition;
      navigate(path);
    }
  };
  useEffect(() => {
    document.title = "Mashud Shamsher Khalid | Software Builder";
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", "https://mashudkhalid.vercel.app/");
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", "https://mashudkhalid.vercel.app/");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <section className="workshop workshop-home">
      <div className="mobile-identity">
        <span className="mobile-portrait" aria-hidden="true">
          <img
            className="mobile-portrait__light"
            src={profile.avatarSrc}
            alt=""
            width="56"
            height="56"
          />
          <img
            className="mobile-portrait__dark"
            src={profile.darkAvatarSrc}
            alt=""
            width="56"
            height="56"
          />
        </span>
        <div>
          <strong>Mashud Khalid</strong>
          <span>Software builder · Philippines</span>
        </div>
      </div>
      <header className="workshop-hero">
        <div>
          <h1 className="home__title" id="home-title">
            Useful software.
            <br />
            <span>Curious by nature.</span>
          </h1>
          <p>{profile.hero.body}</p>
        </div>
        <Link className="text-link" to="/contact">
          Let’s talk <Arrow />
        </Link>
      </header>
      <div className="tool-band">
        <span>Things I build with</span>
        <div>
          {tools.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className="mash-bento">
        <Link
          to="/showcase"
          className="mash-tile tile-featured"
          onClick={(event) => openShared(event, "/showcase", "showcase")}
        >
          <div className="tile-heading">
            <span>Featured build</span>
            <Arrow />
          </div>
          <div className="featured-screen">
            <img
              src="/images/shelves-current.png"
              alt="The Shelves of Mash, a personal archive with interconnected ideas"
            />
          </div>
          <div>
            <h2>The Shelves of Mash</h2>
            <p>A quieter corner of the web for ideas that belong together.</p>
          </div>
        </Link>
        <Link
          to="/projects"
          className="mash-tile tile-work"
          onClick={(event) => openShared(event, "/projects", "projects")}
        >
          <div className="tile-heading">
            <span>Selected work</span>
            <Arrow />
          </div>
          <div className="screen-stack" aria-hidden="true">
            <img src="/images/sulyap-current.png" alt="" />
            <img src="/images/news-current.png" alt="" />
          </div>
          <div>
            <h2>Ideas, made useful.</h2>
            <p>Web apps, mobile builds, and campus systems.</p>
          </div>
        </Link>
        <Link
          to="/about"
          className="mash-tile tile-about"
          onClick={(event) => openShared(event, "/about", "about")}
        >
          <img src="/images/1x1-pic-480.webp" alt="Mashud" />
          <div>
            <div className="tile-heading">
              <span>A little about me</span>
              <Arrow />
            </div>
            <h2>
              A builder.
              <br />
              Still a learner.
            </h2>
            <p>From Maguindanao del Sur, with plenty left to explore.</p>
          </div>
        </Link>
        <Link
          to="/lab"
          className="mash-tile tile-lab"
          onClick={(event) => openShared(event, "/lab", "lab")}
        >
          <div className="tile-heading">
            <GameController size={26} aria-hidden="true" />
            <Arrow />
          </div>
          <div>
            <h2>The learning lab</h2>
            <p>
              Following my curiosity into games, systems, and how things feel.
            </p>
          </div>
        </Link>
        <a
          href="/resume.pdf"
          className="mash-tile tile-resume"
          target="_blank"
          rel="noreferrer"
        >
          <div className="tile-heading">
            <BookOpen size={24} aria-hidden="true" />
            <Arrow />
          </div>
          <h2>Résumé</h2>
          <p>The background behind the builds.</p>
        </a>
      </div>
    </section>
  );
}

export function Work() {
  const [filter, setFilter] = useState("All");
  const list = projects.filter(
    (p) =>
      filter === "All" ||
      (filter === "Mobile"
        ? p.visual === "tasks"
        : filter === "Campus"
          ? p.role.includes("Academic")
          : !p.visual && !p.role.includes("Academic")),
  );
  return (
    <section className="workshop">
      <PageHead title="Ideas, made useful.">
        Some personal, some practical, all a chance to understand something a
        little better.
      </PageHead>
      <div className="work-filters" role="group" aria-label="Filter projects">
        {["All", "Web", "Mobile", "Campus"].map((f) => (
          <button
            type="button"
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {list.length} projects shown
      </p>
      <div className="project-grid">
        {list.map((p) => (
          <article className="project-card" key={p.title}>
            <div className="project-cover">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  width={p.width}
                  height={p.height}
                />
              ) : p.visual === "tasks" ? (
                <div className="task-preview">
                  <span>Do Your Tasks Pls</span>
                  <label>
                    <input type="checkbox" defaultChecked /> Make something
                    useful
                  </label>
                  <label>
                    <input type="checkbox" /> Learn something new
                  </label>
                  <label>
                    <input type="checkbox" /> Remember to take a break
                  </label>
                </div>
              ) : (
                <div className="task-preview">
                  <span>{p.title}</span>
                  <p>{p.technologies.slice(0, 3).join(" · ")}</p>
                </div>
              )}
            </div>
            <div className="project-copy">
              <p className="project-role">{p.role}</p>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <p className="project-note">{p.note}</p>
              <ul className="tech-list" aria-label="Built with">
                {p.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="project-links">
                {"demo" in p && p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer">
                    Live site <Arrow />
                  </a>
                )}
                <a href={p.repository} target="_blank" rel="noreferrer">
                  Source code <GithubLogo size={18} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Showcase() {
  const shots = projects.filter((p) => p.image);
  const [active, setActive] = useState(0);
  const [annotation, setAnnotation] = useState(0);
  const touchStart = useRef<number | null>(null);
  const move = (delta: number) => {
    setAnnotation(0);
    setActive((i) => (i + delta + shots.length) % shots.length);
  };
  const current = shots[active];
  const notes = projectAnnotations[current.title] ?? [];
  return (
    <section className="workshop showcase-page">
      <PageHead title="A closer look.">
        A shelf of things I’ve built. Turn through the projects, then follow the
        story behind each one.
      </PageHead>
      <div
        className="project-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Project showcase"
        tabIndex={0}
        onKeyDown={(e) => {
          if (
            e.target === e.currentTarget &&
            (e.key === "ArrowRight" || e.key === "ArrowLeft")
          ) {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (
            touchStart.current !== null &&
            Math.abs(e.changedTouches[0].clientX - touchStart.current) > 50
          )
            move(e.changedTouches[0].clientX < touchStart.current ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <div className="carousel-stage">
          {shots.map((p, i) => {
            const offset = (i - active + shots.length) % shots.length;
            const position = offset === shots.length - 1 ? -1 : offset;
            return (
              <div
                className="carousel-slide"
                key={p.title}
                data-position={position}
                aria-hidden={i !== active}
                style={{
                  transform: `translateX(${position * 58}%) translateZ(${Math.abs(position) * -180}px) rotateY(${position * -16}deg)`,
                }}
              >
                <div
                  className="screenshot-frame"
                  style={
                    {
                      "--image-ratio": (p.width ?? 1440) / (p.height ?? 900),
                    } as React.CSSProperties
                  }
                >
                  <img
                    src={absoluteImage(p.image)}
                    alt={i === active ? p.alt : ""}
                    draggable={false}
                  />
                  {i === active &&
                    (projectAnnotations[p.title] ?? []).map((note, index) => (
                      <button
                        key={note.label}
                        type="button"
                        className="screenshot-marker"
                        style={{ left: `${note.x}%`, top: `${note.y}%` }}
                        aria-label={`Show detail: ${note.label}`}
                        aria-pressed={annotation === index}
                        aria-controls="screenshot-detail"
                        onClick={() => setAnnotation(index)}
                      >
                        <span aria-hidden="true">{index + 1}</span>
                      </button>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="carousel-controls">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => move(-1)}
          >
            <ArrowLeft size={22} />
          </button>
          <span aria-live="polite" aria-atomic="true">
            {active + 1} / {shots.length} · {current.title}
          </span>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => move(1)}
          >
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
      {notes.length > 0 && (
        <div
          className="screenshot-detail"
          id="screenshot-detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="screenshot-detail__number" aria-hidden="true">
            {annotation + 1}
          </span>
          <div>
            <h2>{notes[annotation].label}</h2>
            <p>{notes[annotation].detail}</p>
          </div>
          <span className="screenshot-detail__hint">
            Select a marker to explore
          </span>
        </div>
      )}
      <article className="project-story" key={current.title}>
        <div>
          <h2>{current.title}</h2>
          <p className="project-note">{current.note}</p>
          <div className="project-links">
            {"demo" in current && current.demo && (
              <a href={current.demo} target="_blank" rel="noreferrer">
                Visit the project <Arrow />
              </a>
            )}
            <a href={current.repository} target="_blank" rel="noreferrer">
              View source <GithubLogo size={18} />
            </a>
          </div>
        </div>
        <div>
          {current.story.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
      </article>
    </section>
  );
}

export function About() {
  return (
    <section className="workshop">
      <PageHead title="A builder. Still a learner.">
        I’m Mashud Shamsher Khalid, an IT student from Maguindanao del Sur,
        Philippines.
      </PageHead>
      <div className="about-layout">
        <img
          className="about-portrait"
          src="/images/1x1-pic.webp"
          alt="Portrait of Mashud Shamsher Khalid"
          width="1024"
          height="1024"
        />
        <div className="about-copy">
          <h2>I like figuring things out.</h2>
          <p>
            I build practical web and mobile applications while learning the
            systems and stories behind game development. The work ranges from
            real-time conversations to campus workflows to a personal archive of
            connected ideas.
          </p>
          <p>
            I’m drawn to the details that make software feel good to use: a
            clear interaction, a useful feature, or a complicated process that
            finally makes sense.
          </p>
          <p>
            My projects are also a record of how I learn. Build something, meet
            a strange bug, understand it a little better, and try again.
          </p>
          <a
            className="action-link"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Read my résumé <Arrow />
          </a>
        </div>
      </div>
      <h2 className="section-title">What I work with</h2>
      <div className="skills-grid">
        {skillGroups.map((g) => (
          <div key={g.title}>
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h2 className="section-title">Along the way</h2>
      <div className="education-list">
        {achievements.slice(0, 3).map((a) => (
          <div key={a.title}>
            <span>{a.date}</span>
            <div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Lab() {
  return (
    <section className="workshop">
      <PageHead title="Room to experiment.">
        The questions I’m following between working builds. A learning notebook,
        with a little room to play.
      </PageHead>
      <div className="lab-layout">
        <PocketRunner />
        <div className="lab-notes">
          <article>
            <GameController size={26} />
            <h2>Learning how games feel</h2>
            <p>
              Exploring the relationship between player input, movement, and
              feedback. This is a direction I’m learning toward, rather than a
              finished game portfolio.
            </p>
          </article>
          <article>
            <Code size={26} />
            <h2>Understanding the systems</h2>
            <p>
              Sulyap made event-driven programming tangible. Campus projects
              made permissions and workflows real. Each build gives the next
              question a little more context.
            </p>
            <Link to="/projects" className="text-link">
              Explore the builds <Arrow />
            </Link>
          </article>
          <article>
            <BookOpen size={26} />
            <h2>Keeping the connections</h2>
            <p>
              The Shelves of Mash is where technology, culture, history, and
              whatever catches my attention can live beside each other.
            </p>
            <a
              href="https://shelves-of-mash.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Visit the shelves <Arrow />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    // The Web3Forms client discovers this mounted form. Remove it on navigation
    // so returning to Contact initializes the new CAPTCHA container again.
    if (["localhost", "127.0.0.1"].includes(location.hostname)) return;
    const script = document.createElement("script");
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    document.head.append(script);
    return () => script.remove();
  }, []);
  async function submit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();
    const form = root.current?.querySelector("form");
    if (!form || busy) return;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    if (!data.get("h-captcha-response")) {
      setStatus(
        "Please complete the CAPTCHA before sending. You can also email me directly.",
      );
      return;
    }
    data.set("replyto", String(data.get("email")));
    setBusy(true);
    setStatus("Sending your message…");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset();
      setStatus("Message sent. Thanks for reaching out!");
      (
        window as Window & { hcaptcha?: { reset: () => void } }
      ).hcaptcha?.reset();
    } catch {
      setStatus(
        "Your message could not be sent. Please try again or use the email link.",
      );
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    const button = root.current?.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    );
    if (button) {
      button.disabled = busy;
      button.setAttribute("aria-busy", String(busy));
    }
  }, [busy]);
  return (
    <section className="workshop">
      <PageHead title="Start a conversation.">
        Have a project in mind, something to share, or a good question? I’d like
        to hear it.
      </PageHead>
      <div className="contact-layout">
        <div className="contact-intro">
          <h2>Say hello.</h2>
          <a href={`mailto:${profile.email}`}>
            <EnvelopeSimple size={24} />
            <span>{profile.email}</span>
            <Arrow />
          </a>
          <a
            href="https://github.com/mashudSCK"
            target="_blank"
            rel="noreferrer"
          >
            <GithubLogo size={24} />
            GitHub <Arrow />
          </a>
          <a
            href="https://linkedin.com/in/mashudkhalid"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinLogo size={24} />
            LinkedIn <Arrow />
          </a>
          <p>
            Maguindanao del Sur, Philippines
            <br />
            Philippine Standard Time · UTC+8
          </p>
          <p>You can email me directly if the form isn’t available.</p>
        </div>
        <div>
          <div
            ref={root}
            onSubmit={submit}
            dangerouslySetInnerHTML={{ __html: contactMarkup }}
          />
          <p className="contact-status" role="status" aria-live="polite">
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Missing() {
  return (
    <section className="workshop">
      <PageHead title="That shelf is empty.">
        This page doesn’t exist. There’s plenty to explore back home.
      </PageHead>
      <Link className="action-link" to="/">
        Back home <ArrowLeft size={20} />
      </Link>
    </section>
  );
}
