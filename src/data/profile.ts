import { Briefcase, Stack, Clock } from "@/components/slab";
export const profile = {
  name: "Mashud Shamsher Khalid",
  firstName: "Mashud",
  handle: "@mashudSCK",
  role: "Software builder",
  avatarSrc: "/images/mashud-tired-developer.png",
  darkAvatarSrc: "/images/mashud-coffee-developer.png",
  verifiedLabel: "",
  email: "mashudkhalid.work@gmail.com",
  location: "Maguindanao del Sur, Philippines",
  stats: [
    { value: "Web", label: "Working systems", Icon: Briefcase },
    { value: "Mobile", label: "Useful apps", Icon: Stack },
    { value: "GMT+8", label: "Philippines", Icon: Clock },
  ],
  displayName: { line1: "Useful software.", line2: "Curious by nature." },
  hero: {
    body: "I’m Mashud, an IT student building web and mobile applications while finding my way into game development. One working system, strange bug, and small lesson at a time.",
    portraitSrc: "/images/mashud-tired-developer.png",
    portraitAlt: "Illustrated portrait of Mashud Shamsher Khalid",
  },
  socials: [
    {
      label: "GitHub profile",
      href: "https://github.com/mashudSCK",
      iconPath: "/icons/github.svg",
    },
    {
      label: "LinkedIn profile",
      href: "https://linkedin.com/in/mashudkhalid",
      iconPath: "/icons/linkedin.svg",
    },
  ],
};
