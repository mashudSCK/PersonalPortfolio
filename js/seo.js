export function addStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mashud Shamsher Khalid",
    url: "https://mashudkhalid.vercel.app/",
    image: "https://mashudkhalid.vercel.app/images/1x1-pic.webp",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/mashudSCK",
      "https://linkedin.com/in/mashudkhalid",
      "https://www.facebook.com/mashud.nvm",
    ],
    knowsAbout: [
      "JavaScript",
      "PHP",
      "React",
      "Next.js",
      "Node.js",
      "MySQL",
      "Game development",
    ],
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.append(script);
}
