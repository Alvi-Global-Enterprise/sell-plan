export type ResourceRegion = "UK" | "USA" | "Europe" | "International";

export type LearningLevel = "beginner" | "intermediate" | "advanced" | null;

/** Exact Resource Centre submenus from ChatGPT §8 */
export type ResourceMenuId =
  | "all"
  | "library"
  | "grants"
  | "courses"
  | "python"
  | "ai-learning"
  | "webinars"
  | "advertise"
  | "networking"
  | "government"
  | "international";

export type Resource = {
  id: string;
  title: string;
  description: string;
  menu: Exclude<ResourceMenuId, "all">;
  url: string;
  region: ResourceRegion;
  level?: LearningLevel;
  featured?: boolean;
  sponsored?: boolean;
  bookmarked?: boolean;
};

export type Listing = {
  id: string;
  title: string;
  category: string;
  location: string;
  price: string;
  status: "Live" | "Draft" | "Pending";
  type: "Business" | "Plan" | "Investment";
  image: string;
};

export type PortalEvent = {
  id: string;
  title: string;
  date: string;
  day: number;
  month: string;
  type: "Webinar" | "Workshop" | "Networking";
  host: string;
  featured?: boolean;
  priceNote?: string;
};

/** Customer office only — staff tools live under /admin */
export const navItems = [
  { href: "/portal", label: "Dashboard", icon: "home" },
  { href: "/portal/marketplace", label: "Marketplace", icon: "store" },
  { href: "/portal/listings", label: "My Listings", icon: "list" },
  { href: "/portal/resources", label: "Resource Centre", icon: "book" },
  { href: "/portal/events", label: "Webinars & Events", icon: "calendar" },
  { href: "/portal/ai", label: "AI Tools", icon: "spark" },
  { href: "/portal/bookmarks", label: "Bookmarks", icon: "bookmark" },
  { href: "/portal/membership", label: "Membership", icon: "badge" },
  { href: "/portal/account", label: "Account", icon: "user" },
] as const;

/** Separate staff portal */
export const adminNavItems = [
  { href: "/admin", label: "Approvals", icon: "shield" },
  { href: "/admin/resources", label: "Resource catalogue", icon: "book" },
  { href: "/admin/events", label: "Events queue", icon: "calendar" },
  { href: "/admin/ads", label: "Sponsored ads", icon: "badge" },
] as const;

export const resourceMenus: { id: ResourceMenuId; label: string; hint: string }[] =
  [
    { id: "all", label: "All", hint: "Live directory" },
    {
      id: "library",
      label: "Library & Business Research",
      hint: "Books, research and IP",
    },
    {
      id: "grants",
      label: "Grants & Funding Finder",
      hint: "Financial support",
    },
    {
      id: "courses",
      label: "Free Courses & Qualifications",
      hint: "Open learning",
    },
    {
      id: "python",
      label: "Python & Coding",
      hint: "Digital skills",
    },
    {
      id: "ai-learning",
      label: "AI & Automation Learning",
      hint: "AI skills",
    },
    {
      id: "webinars",
      label: "Webinars & Events",
      hint: "Attend or advertise",
    },
    {
      id: "advertise",
      label: "Advertise Your Business",
      hint: "Promote services",
    },
    {
      id: "networking",
      label: "Business Networking",
      hint: "Partners & investors",
    },
    {
      id: "government",
      label: "Government Services",
      hint: "Tax, IP, cyber, contracts",
    },
    {
      id: "international",
      label: "International Business Resources",
      hint: "Export & global",
    },
  ];

/** Pill shortcuts matching ChatGPT §1 layout */
export const officePillars = [
  { label: "Libraries & research", menu: "library" as const },
  { label: "Grants & funding", menu: "grants" as const },
  { label: "Learning & Python", menu: "python" as const },
  { label: "Webinars & events", menu: "webinars" as const },
  { label: "Advertising", menu: "advertise" as const },
  { label: "Business networking", menu: "networking" as const },
];

export const resources: Resource[] = [
  // A. Libraries, research
  {
    id: "r1",
    title: "British Library Business & IP Centre",
    description:
      "Free business advice, research, workshops and IP information.",
    menu: "library",
    url: "https://www.bl.uk/business-and-ip-centre",
    region: "UK",
    featured: true,
    bookmarked: true,
  },
  {
    id: "r2",
    title: "Find a local business library",
    description:
      "Find one of 70+ UK Business & IP Centre library locations.",
    menu: "library",
    url: "https://www.bl.uk/business-and-ip-centre/find-a-centre",
    region: "UK",
  },
  {
    id: "r3",
    title: "Business & IP Centres",
    description: "Regional business support through the BIPC network.",
    menu: "library",
    url: "https://www.bl.uk/business-and-ip-centre",
    region: "UK",
  },
  {
    id: "r4",
    title: "Business library resources",
    description:
      "Example library databases including GrantFinder and COBRA access.",
    menu: "library",
    url: "https://www.bl.uk/business-and-ip-centre/online-resources",
    region: "UK",
  },

  // B. Grants & funding
  {
    id: "r5",
    title: "Find a Grant",
    description:
      "Official government grant search and eligibility information.",
    menu: "grants",
    url: "https://www.find-government-grants.service.gov.uk/",
    region: "UK",
    featured: true,
    bookmarked: true,
  },
  {
    id: "r6",
    title: "Business Finance Support",
    description: "Government funding, grants, loans and advice.",
    menu: "grants",
    url: "https://www.gov.uk/business-finance-support",
    region: "UK",
  },
  {
    id: "r7",
    title: "Business for London",
    description:
      "Free digital support, marketing, AI training and webinars for eligible London businesses.",
    menu: "grants",
    url: "https://www.businessforlondon.co.uk/",
    region: "UK",
  },
  {
    id: "r8",
    title: "Northern Ireland Business Support Finder",
    description: "Find local business support and funding in Northern Ireland.",
    menu: "grants",
    url: "https://www.nibusinessinfo.co.uk/",
    region: "UK",
  },
  {
    id: "r9",
    title: "Business Wales",
    description: "Advice, funding and support for Welsh businesses.",
    menu: "grants",
    url: "https://businesswales.gov.wales/",
    region: "UK",
  },
  {
    id: "r10",
    title: "UK business funding directory",
    description: "Browse UK funding programmes and finance options.",
    menu: "grants",
    url: "https://www.gov.uk/business-finance-support",
    region: "UK",
  },

  // C. Free learning / courses
  {
    id: "r11",
    title: "OpenLearn",
    description: "Free courses from The Open University.",
    menu: "courses",
    url: "https://www.open.edu/openlearn/",
    region: "UK",
    level: "beginner",
  },
  {
    id: "r12",
    title: "National Careers Service",
    description: "Find training, courses and career guidance.",
    menu: "courses",
    url: "https://nationalcareers.service.gov.uk/",
    region: "UK",
    level: "beginner",
  },
  {
    id: "r13",
    title: "freeCodeCamp",
    description: "Free coding and technology training with certifications.",
    menu: "courses",
    url: "https://www.freecodecamp.org/",
    region: "International",
    level: "intermediate",
    bookmarked: true,
  },

  // Python & coding
  {
    id: "r14",
    title: "Learn Python",
    description: "Interactive Python lessons for beginners and beyond.",
    menu: "python",
    url: "https://www.learnpython.org/",
    region: "International",
    level: "beginner",
    featured: true,
  },
  {
    id: "r15",
    title: "W3Schools",
    description: "Free programming tutorials across web and scripting languages.",
    menu: "python",
    url: "https://www.w3schools.com/",
    region: "International",
    level: "beginner",
  },
  {
    id: "r16",
    title: "Python.org",
    description: "Official Python learning resources and documentation.",
    menu: "python",
    url: "https://www.python.org/about/gettingstarted/",
    region: "International",
    level: "intermediate",
  },
  {
    id: "r17",
    title: "freeCodeCamp — Python",
    description: "Project-based Python and data science pathways.",
    menu: "python",
    url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
    region: "International",
    level: "advanced",
  },

  // AI & automation learning
  {
    id: "r18",
    title: "Business for London — AI training",
    description: "AI training and digital webinars for eligible London businesses.",
    menu: "ai-learning",
    url: "https://www.businessforlondon.co.uk/",
    region: "UK",
    level: "beginner",
  },
  {
    id: "r19",
    title: "OpenLearn — Digital & AI",
    description: "Free Open University courses on digital skills and technology.",
    menu: "ai-learning",
    url: "https://www.open.edu/openlearn/science-maths-technology",
    region: "UK",
    level: "intermediate",
  },

  // D. Events / webinars
  {
    id: "r20",
    title: "Eventbrite",
    description: "Create online webinars, workshops, networking and ticketed events.",
    menu: "webinars",
    url: "https://www.eventbrite.com/",
    region: "International",
    featured: true,
  },
  {
    id: "r21",
    title: "How to create and publish an event",
    description: "Eventbrite guide to publishing webinars and workshops.",
    menu: "webinars",
    url: "https://www.eventbrite.com/organizer/overview/",
    region: "International",
  },
  {
    id: "r22",
    title: "Eventbrite Help Centre",
    description: "Support articles for organisers and attendees.",
    menu: "webinars",
    url: "https://www.eventbrite.com/help/",
    region: "International",
  },
  {
    id: "r23",
    title: "Meetup",
    description: "Business networking groups and local meetings.",
    menu: "webinars",
    url: "https://www.meetup.com/",
    region: "International",
  },
  {
    id: "r24",
    title: "Zoom",
    description: "Host online meetings and webinars.",
    menu: "webinars",
    url: "https://zoom.us/",
    region: "International",
  },
  {
    id: "r25",
    title: "LinkedIn Events",
    description: "Promote webinars and professional events.",
    menu: "webinars",
    url: "https://www.linkedin.com/products/linkedin-events/",
    region: "International",
  },

  // 3. Advertising
  {
    id: "r26",
    title: "Yell",
    description: "UK business directory listings and local advertising.",
    menu: "advertise",
    url: "https://www.yell.com/",
    region: "UK",
  },
  {
    id: "r27",
    title: "Google Business Profile",
    description: "Appear in Google local searches and attract nearby customers.",
    menu: "advertise",
    url: "https://business.google.com/",
    region: "International",
    featured: true,
    bookmarked: true,
  },
  {
    id: "r28",
    title: "LinkedIn",
    description: "Professional networking and advertising.",
    menu: "advertise",
    url: "https://www.linkedin.com/advertising/",
    region: "International",
  },
  {
    id: "r29",
    title: "Meta Business",
    description: "Facebook and Instagram business promotion.",
    menu: "advertise",
    url: "https://www.facebook.com/business",
    region: "International",
  },
  {
    id: "r30",
    title: "FreeIndex",
    description: "UK business directory.",
    menu: "advertise",
    url: "https://www.freeindex.co.uk/",
    region: "UK",
    sponsored: true,
  },
  {
    id: "r31",
    title: "Trustpilot",
    description: "Customer reviews and reputation management.",
    menu: "advertise",
    url: "https://www.trustpilot.com/",
    region: "International",
  },
  {
    id: "r32",
    title: "Federation of Small Businesses",
    description: "Business support and networking for SMEs.",
    menu: "advertise",
    url: "https://www.fsb.org.uk/",
    region: "UK",
  },

  // Networking
  {
    id: "r33",
    title: "Meetup — Business groups",
    description: "Meet partners and potential investors locally.",
    menu: "networking",
    url: "https://www.meetup.com/topics/business/",
    region: "International",
  },
  {
    id: "r34",
    title: "LinkedIn Networking",
    description: "Connect with buyers, sellers and investors.",
    menu: "networking",
    url: "https://www.linkedin.com/",
    region: "International",
  },
  {
    id: "r35",
    title: "FSB Networking",
    description: "Federation of Small Businesses community and events.",
    menu: "networking",
    url: "https://www.fsb.org.uk/",
    region: "UK",
  },

  // 4. Government services
  {
    id: "r36",
    title: "Companies House",
    description: "Company registration and official company records.",
    menu: "government",
    url: "https://www.gov.uk/government/organisations/companies-house",
    region: "UK",
    featured: true,
  },
  {
    id: "r37",
    title: "HMRC Business Tax",
    description: "Tax, VAT and self-assessment for businesses.",
    menu: "government",
    url: "https://www.gov.uk/browse/tax",
    region: "UK",
  },
  {
    id: "r38",
    title: "Intellectual Property Office",
    description: "Protect trademarks, designs, patents and copyright.",
    menu: "government",
    url: "https://www.gov.uk/government/organisations/intellectual-property-office",
    region: "UK",
  },
  {
    id: "r39",
    title: "National Cyber Security Centre",
    description: "Cybersecurity guidance for organisations.",
    menu: "government",
    url: "https://www.ncsc.gov.uk/",
    region: "UK",
  },
  {
    id: "r40",
    title: "Information Commissioner's Office",
    description: "Data protection and GDPR guidance.",
    menu: "government",
    url: "https://ico.org.uk/",
    region: "UK",
  },
  {
    id: "r41",
    title: "Find government contracts",
    description: "Search public-sector contracts and tenders.",
    menu: "government",
    url: "https://www.gov.uk/contracts-finder",
    region: "UK",
  },

  // International
  {
    id: "r42",
    title: "GOV.UK International trade support",
    description: "Exporting advice and international trade support.",
    menu: "international",
    url: "https://www.gov.uk/international-trade",
    region: "International",
  },
  {
    id: "r43",
    title: "USA Small Business Administration",
    description: "US funding, counselling and learning for small businesses.",
    menu: "international",
    url: "https://www.sba.gov/",
    region: "USA",
  },
  {
    id: "r44",
    title: "European Commission — Access to finance",
    description: "EU-level finance and support for businesses.",
    menu: "international",
    url: "https://europa.eu/youreurope/business/finance-funding/getting-funding/access-finance/index_en.htm",
    region: "Europe",
  },
];

export const marketplaceListings: Listing[] = [
  {
    id: "1",
    title: "Popular Café and Coffee Shop",
    category: "Hospitality",
    location: "London, UK",
    price: "£185,000",
    status: "Live",
    type: "Business",
    image: "/assets/explorethemarketplace/popularcafe.png",
  },
  {
    id: "2",
    title: "Modern Gym & Fitness Centre",
    category: "Fitness",
    location: "Manchester, UK",
    price: "£420,000",
    status: "Live",
    type: "Business",
    image: "/assets/explorethemarketplace/gym.png",
  },
  {
    id: "3",
    title: "Profitable Online Retail Business",
    category: "E-commerce",
    location: "Birmingham, UK",
    price: "£95,000",
    status: "Live",
    type: "Business",
    image: "/assets/explorethemarketplace/ecommerce.png",
  },
  {
    id: "4",
    title: "Construction Services Business",
    category: "Construction",
    location: "Leeds, UK",
    price: "£310,000",
    status: "Pending",
    type: "Business",
    image: "/assets/explorethemarketplace/construction.png",
  },
  {
    id: "5",
    title: "Café Launch Business Plan",
    category: "Retail Plan",
    location: "UK-wide",
    price: "£49",
    status: "Live",
    type: "Plan",
    image: "/assets/explorethemarketplace/popularcafe.png",
  },
  {
    id: "6",
    title: "Fitness Centre Investment Round",
    category: "Investment",
    location: "Manchester, UK",
    price: "£150,000 raise",
    status: "Live",
    type: "Investment",
    image: "/assets/explorethemarketplace/gym.png",
  },
];

export const myListings: Listing[] = [
  marketplaceListings[0]!,
  { ...marketplaceListings[4]!, status: "Draft" },
  { ...marketplaceListings[3]!, status: "Pending" },
];

export const events: PortalEvent[] = [
  {
    id: "e1",
    title: "AI for Small Business Growth",
    date: "12 Nov 2026 · 18:00",
    day: 12,
    month: "Nov",
    type: "Webinar",
    host: "SellPlan Academy",
    featured: true,
    priceNote: "Featured · £5–£10",
  },
  {
    id: "e2",
    title: "Accessing UK Business Grants",
    date: "18 Nov 2026 · 12:30",
    day: 18,
    month: "Nov",
    type: "Workshop",
    host: "Business Support UK",
  },
  {
    id: "e3",
    title: "Investor Networking Evening",
    date: "25 Nov 2026 · 19:00",
    day: 25,
    month: "Nov",
    type: "Networking",
    host: "SellPlan Community",
    featured: true,
    priceNote: "Featured · £5–£10",
  },
  {
    id: "e4",
    title: "Listing Your Business Successfully",
    date: "2 Dec 2026 · 17:00",
    day: 2,
    month: "Dec",
    type: "Webinar",
    host: "SellPlan Academy",
  },
];

export const revenueAddOns = [
  {
    feature: "Basic resource directory",
    charge: "Included",
  },
  {
    feature: "Submit an event",
    charge: "Free basic listing",
  },
  {
    feature: "Featured webinar",
    charge: "£5–£10",
  },
  {
    feature: "Featured business directory listing",
    charge: "£5–£15 / month",
  },
  {
    feature: "Sponsored resource placement",
    charge: "£10–£30 / month",
  },
  {
    feature: "Premium opportunity alerts",
    charge: "Higher subscriptions",
  },
  {
    feature: "Featured grant or training provider",
    charge: "Negotiated fee",
  },
];

export const dashboardStats = [
  { label: "Active listings", value: "2", hint: "1 pending review" },
  { label: "Saved resources", value: "4", hint: "Personal bookmarks" },
  { label: "Upcoming events", value: "3", hint: "Next in 7 days" },
  { label: "Plan", value: "Starter", hint: "Resource Centre included" },
];

export const menuLabel = (id: ResourceMenuId) =>
  resourceMenus.find((m) => m.id === id)?.label ?? id;
