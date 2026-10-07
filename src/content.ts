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

// LinkedIn posts shown at the bottom of the Speaking section. Empty list = hidden.
// url:   the post link (on LinkedIn: "..." on the post > "Copy link to post").
// text:  recommended. The first line or two of the post. With it, the post shows as a card in the
//        site's own style; without it, LinkedIn's own embedded post is shown instead.
// image: optional, only used with `text`. A photo id like "speaking/fireside-conversation",
//        or a file path like "/linkedin/post-1.jpg" (put the file in public/linkedin/).
// date:  optional, shown as written, e.g. "March 2026".
export const linkedin = {
  label: "From LinkedIn",
  followLabel: "Follow on LinkedIn",
  posts: [
    {
      url: "https://www.linkedin.com/posts/rabiatiti_oneleapaway-leap26-share-7474019399310585856-4KM8/?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAohE48BPqn2KsS3pPhJUwjsOfhhiAQSo3A",
      text: "",
      image: "",
      date: "03-08-2026",
    },
    {
      url: "https://www.linkedin.com/posts/rabiatiti_thehumanadvantage-thehumanadvantage-impactinaction-share-7448332934698217472-TYs6/?highlightedUpdateUrn=urn%3Ali%3Aactivity%3A7448332936225067008&highlightedUpdateType=SOCIAL_SHARE&origin=SOCIAL_SHARE&utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAohE48BPqn2KsS3pPhJUwjsOfhhiAQSo3A&utm_campaign=whatsapp",
      text: "",
      image:
        "https://media.licdn.com/dms/image/v2/D4E22AQG-qQV3a4eEaQ/feedshare-image-high-res/B4EZ13LVcvHQAY-/0/1775820953910?e=2147483647&v=beta&t=aqXv1HEk11Dd_d9auCwO5rUfgG6XvFaEWDm83LYO-M0",
      date: "",
    },
    {
      url: "https://www.linkedin.com/posts/rabiatiti_lead-leap-leapfrog-activity-7501671392615194625-rt2d?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAAohE48BPqn2KsS3pPhJUwjsOfhhiAQSo3A&utm_campaign=whatsapp",
      text: "",
      image:
        "https://media.licdn.com/dms/image/v2/D4E22AQG-qQV3a4eEaQ/feedshare-image-high-res/B4EZ13LVcvHQAY-/0/1775820953910?e=2147483647&v=beta&t=aqXv1HEk11Dd_d9auCwO5rUfgG6XvFaEWDm83LYO-M0",
      date: "",
    },
  ] as { url: string; text?: string; image?: string; date?: string }[],
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
        "A powerful and essential read that proves in an age of machines, our humanity is our greatest advantage. Rabi lights the way forward, championing empathy, creativity,and courage that are not just soft skill, but strategic imperatives for success.",
      name: "Mark Breslin",
      title: "Co-founder and Director, Amplif & Impact AI Consultancy",
    },

    {
      quote:
        "Only Rabi could write this- a book grounded in lived experience and global insight, with case studies that break the usual mould. The argument is so well-reasoned and compelling, you're left nodding-and ready to act.",
      name: "Meera Somji",
      title: "Ceo and Founder, Clusivity",
    },

    {
      quote:
        "Courage comes in many forms. Rabi Atiti's life displays a passion for life conjoined with the courage to make key decisions that influenceand bring change. We believe That Human Advantage is a prophetic and anointed 'now word' for leaders across the globe. It is a word of hope, reminding us of the gift of our humanity, and reinforcing the truth that we are much more than machines: we are made in the image of God.",
      name: "Neil and Hazel Pattison",
      title: "Lead Couple, Jubilee Church Maidstone",
    },

    {
      quote:
        "A compelling exploration of what makes us uniquely human in an increasingly technological word. The Human Advantage offers profound insight and a refreshing perspective on our enduring capabilities.",
      name: "Deji Soyemi",
      title: "IT Consultant",
    },

    {
      quote:
        "I have known Rabi very closely for over two decades, from being a university student combining education with trading to support herself through school, to the wonderful mother and amiable business leader that she has become. No one is better suited than Rabi to write about what the enormous power of the human advantage brings to all situations of change in our lives and workplaces. This is a story well told and a book well written. A must-read and re-read.",
      name: "Dr Austin Okogun",
      title: "CEO, Lily Hospitals, Nigeria",
    },
  ],
};

// Partners section, straight after the book.
// Each entry shows: logo (if any), name, note (if any), then the website as a small link.
// logo: optional path to a file in /public/partners, e.g. "/partners/quivers.png"
//       (SVG or PNG on a transparent background works best).
// href: optional full website address, e.g. "https://quiversacademy.org". The site shows it as "quiversacademy.org".
// note: optional short description, shown under the name. One or two sentences reads best.
type Partner = { name: string; logo?: string; href?: string; note?: string };

export const partners = {
  causeLabel: "Book proceeds support",
  // Wording from the book launch banner. TODO: confirm with Rabi.
  causeHeadline:
    "Every copy of The Human Advantage supports STEM education in the UK, Nigeria and Rwanda.",
  // TODO: the charities that receive book proceeds.
  charities: [
    {
      name: "Godly Quivers Stewardship Foundation - A.K.A Quivers Academy",
      note: "is a Christian non-profit aiming at equipping Teenagers and Children in Nigeria with STEM skills with the options to also strengthen their character through Christians Ethical Values and Principles.",
      logo: "https://quiversacademy.org/wp-content/uploads/2024/11/quivers-logo.png", // put the file in public/partners/
      href: "https://quiversacademy.org",
    },
    { name: "Charity name", note: "One line on what they do" },
  ] as Partner[],
  partnersLabel: "Professional partners",
  // TODO: the professional bodies Rabi partners with.
  partners: [{ name: "Partner name" }, { name: "Partner name" }] as Partner[],
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
    "The future belongs to those who can connect what technology can do with what humans are capable of.",
    "I'm a speaker, strategist and author working where human behaviour meets artificial intelligence. My work helps people see change clearly, trust their own judgement and move forward together.",
    "I work where AI meets human behaviour.",
    "I help leaders and organisations think differently about the future, bringing together AI, human capital, leadership, culture and workplace transformation to turn complexity into clarity, change into opportunity, and technology into human advantage.",
    "Global intelligence. Local insight. Human at the centre.",
    "That, to me, is winning with AI.",
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
