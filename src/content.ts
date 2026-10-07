// All the words on the site live here, so copy changes never require touching layout code.
// Lines marked TODO need a real value from Rabi before launch.
// Photo ids are "<folder>/<file name without extension>" from the /photos folder.

export type SocialIcon =
  | "linkedin"
  | "instagram"
  | "x"
  | "youtube"
  | "facebook";

export const site = {
  name: "Rabi Atiti",
  email: "hello@rabiatiti.com", // TODO: confirm this inbox exists
  tagline: "Human wisdom for an intelligent world.",
  // An empty href shows the icon greyed out and not clickable until the link is added.
  socials: [
    {
      label: "LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/in/rabiatiti/",
    },
    { label: "Instagram", icon: "instagram", href: "" }, // TODO
    { label: "X", icon: "x", href: "" }, // TODO
    { label: "YouTube", icon: "youtube", href: "" }, // TODO
    { label: "Facebook", icon: "facebook", href: "" }, // TODO
  ] as { label: string; icon: SocialIcon; href: string }[],
};

// "Book Rabi" opens a pre-filled email. Paste a Calendly link here to send people there instead.
export const booking = {
  calendlyUrl: "",
  subject: "Speaking enquiry",
  body: "Hi Rabi,\n\nI'd like to invite you to speak.\n\nEvent:\nDate:\nLocation (or virtual):\nAudience and size:\nFormat (keynote, panel, workshop):\n\nThank you,\n",
};

export const hero = {
  eyebrow: "Speaker, strategist, author",
  headline: ["WINNING WITH AI", "AI + Human Partnership "],
  emphasis: "is the future.",
  sub: "",
  photo: "portraits/with-the-human-advantage",
};

export const manifesto =
  "Rabi helps leaders and organisations think differently about AI, connecting global intelligence with local insight to unlock new possibilities, solve complex challenges and create meaningful impact.Keeping people at the centre and in control. Global intelligence. Local insight. The Human Advantage.";

export const stages = {
  photo: "panels/deepfest-main-stage",
  label: "Recent stages",
  names: ["DeepFest", "Money20/20", "Renewable Energy India Expo", "Informa"],
};

export const speaking = {
  headline: "Talks leaders act on.",
  topics: [
    {
      title: "The Human Advantage",
      body: "The judgement, imagination and empathy that become more valuable, not less, as AI does more of the work.",
      photo: "speaking/fireside-conversation",
      position: "50% 30%",
    },
    {
      title: "Leadership under pressure",
      body: "How to make clear decisions and keep people with you when the ground keeps moving.",
      photo: "panels/deepfest-panel",
      position: "78% 50%",
    },
    {
      title: "Adaptability without burnout",
      body: "A practical way to build change-ready teams without exhausting the humans inside them.",
      photo: "panels/sustainability-panel",
      position: "50% 40%",
    },
  ],
  formats: [
    "Keynotes",
    "Leadership workshops",
    "Panels and fireside chats",
    "Executive offsites",
  ],
};

export const book = {
  eyebrow: "The book",
  title: "The Human Advantage",
  subtitle: "Harnessing the strength of human capital in an AI-driven world",
  body: "A field guide for leaders who want to decide well, build trust and stay deeply human beside intelligent machines.",
  cover: "/book/the-human-advantage.png",
  buyHref: "https://www.amazon.com/dp/B0FLTKW3RQ",
  // TODO: replace with real endorsements (exact wording, with the endorser's permission).
  // 1 to 3 short quotes read best. Remove an entry to hide it; an empty list hides the whole row.
  endorsementsLabel: "Praise for The Human Advantage",
  endorsements: [
    {
      quote:
        "A clear, humane guide to leading people well while the technology around them changes.",
      name: "Endorser Name",
      title: "Title, Organisation",
    },
    {
      quote:
        "Practical and generous. Every leader working with AI should read it with their team.",
      name: "Endorser Name",
      title: "Title, Organisation",
    },
    {
      quote:
        "Rabi makes the case that our humanity is the competitive edge, and shows how to use it.",
      name: "Endorser Name",
      title: "Title, Organisation",
    },
  ],
};

// Partners section, straight after the book.
// logo: optional path to a file in /public/partners (SVG or PNG on a transparent background works best).
//       Without a logo, the name is shown in the headline font instead.
// href: optional link to their website. note: optional one line under a charity.
type Partner = { name: string; logo?: string; href?: string; note?: string };

export const partners = {
  causeLabel: "Book proceeds support",
  // Wording from the book launch banner. TODO: confirm with Rabi.
  causeHeadline:
    "Every copy of The Human Advantage supports STEM education in the UK, Nigeria and Rwanda.",
  // TODO: the charities that receive book proceeds.
  charities: [
    {
      name: "Quivers Academy",
      note: "Godly Quivers Stewardship Foundation - A.K.A Quivers Academy: is a Christian non-profit aiming at equipping Teenagers and Children in Nigeria with STEM skills with the options to also strengthen their character through Christians Ethical Values and Principles.",
    },
    { name: "Charity name", note: "One line on what they do" },
    { name: "Charity name", note: "One line on what they do" },
  ] as Partner[],
  partnersLabel: "Professional partners",
  // TODO: the professional bodies Rabi partners with.
  partners: [
    { name: "Partner name" },
    { name: "Partner name" },
    { name: "Partner name" },
    { name: "Partner name" },
    { name: "Partner name" },
  ] as Partner[],
};

export const gallery = {
  headline: "Moments on and off the stage.",
  initialCount: 12, // photos shown before "Show all"
  // Friendly names and order for the photo folders. Unlisted folders appear after these.
  labels: {
    speaking: "Speaking",
    panels: "Panels",
    events: "Events",
    book: "Book",
    portraits: "Portraits",
  } as Record<string, string>,
};

export const about = {
  headline: "I care about what technology asks of people.",
  paragraphs: [
    "I'm a speaker, strategist and author working where human behaviour meets artificial intelligence. My work helps people see change clearly, trust their own judgement and move forward together.",
  ],
  photo: "portraits/smiling-in-blue",
};

export const contact = {
  eyebrow: "Speaking and media",
  headline: "Let's make your next room matter.",
  body: "Tell Rabi about your event, audience and date. She replies to every serious enquiry.",
  newsletter: {
    headline: "A note from Rabi, every Sunday.",
    body: "One practical thought on people, leadership and life with AI.",
    // TODO: paste a form endpoint (Formspree, Buttondown, Mailchimp). Empty = sign-ups arrive by email.
    endpoint: "",
  },
};
