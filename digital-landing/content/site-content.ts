export type NavLink = {
  label: string;
  type: "scroll" | "route";
  href?: string;
  section?: "features" | "showcase";
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: "layers" | "palette" | "sparkles" | "shield" | "layout" | "code";
};

export type ShowcaseTab = {
  label: string;
  heading: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  featured?: boolean;
  features: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const navLinks: NavLink[] = [
  { label: "About", type: "route", href: "/" },
  { label: "Features", type: "scroll", section: "features" },
  { label: "Showcase", type: "scroll", section: "showcase" },
  { label: "Pricing", type: "route", href: "/pricing" },
  { label: "Docs", type: "route", href: "/docs" },
];

export const heroContent = {
  badge: "Concept Project",
  title: "Ship premium product UI faster.",
  subtitle:
    "Nebula is a component platform for teams building modern web apps. Motion, themes, and layouts are included from day one.",
  primaryCta: "Get started",
  secondaryCta: "View demo",
};

export const socialProof = {
  text: "Trusted by teams shipping weekly",
  companies: ["Acme", "Vertex", "Nova", "Northstar", "Delta Labs", "Orbit"],
};

export const features: FeatureItem[] = [
  {
    title: "Real-time Components",
    description: "Compose production-ready blocks and ship polished interfaces in minutes.",
    icon: "layers",
  },
  {
    title: "Theme System",
    description: "Build once and switch visual styles with consistent tokens and gradients.",
    icon: "palette",
  },
  {
    title: "Motion Presets",
    description: "Use smooth transitions that feel premium without animation overhead.",
    icon: "sparkles",
  },
  {
    title: "Accessible by Default",
    description: "Keyboard-friendly interactions and strong contrast tuned for readability.",
    icon: "shield",
  },
  {
    title: "Layout Blocks",
    description: "Mix hero, testimonials, pricing, and docs patterns into cohesive pages.",
    icon: "layout",
  },
  {
    title: "Developer-Friendly API",
    description: "Predictable props and clean TypeScript patterns for fast implementation.",
    icon: "code",
  },
];

export const showcaseTabs: ShowcaseTab[] = [
  {
    label: "Dashboard",
    heading: "Monitor every release in one control center",
    description:
      "Track growth, uptime, and adoption with concise snapshots and live indicators.",
    metrics: [
      { label: "Weekly Releases", value: "24" },
      { label: "Active Teams", value: "192" },
      { label: "Avg. Deploy Time", value: "4m 12s" },
    ],
  },
  {
    label: "Billing",
    heading: "Pricing workflows your team can trust",
    description:
      "Run subscriptions, invoices, and usage tracking with clear alerts and timelines.",
    metrics: [
      { label: "MRR Growth", value: "+18.6%" },
      { label: "Recovered Revenue", value: "$12.4k" },
      { label: "Failed Payments", value: "1.8%" },
    ],
  },
  {
    label: "Analytics",
    heading: "Surface insights before they become bottlenecks",
    description:
      "Spot drop-offs and activation trends with dashboards designed for quick decisions.",
    metrics: [
      { label: "Activation", value: "71%" },
      { label: "Retention 90d", value: "59%" },
      { label: "NPS", value: "64" },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nebula made our product launch feel enterprise-grade in less than two weeks.",
    name: "Maya Chen",
    role: "Head of Product",
    company: "Northstar",
  },
  {
    quote:
      "The motion presets are subtle and elegant. It finally feels like a premium app.",
    name: "Daniel Reyes",
    role: "Design Lead",
    company: "Delta Labs",
  },
  {
    quote:
      "Our developers moved faster because the components are clear and predictable.",
    name: "Ava Martin",
    role: "Engineering Manager",
    company: "Orbit",
  },
];

export const plans: Plan[] = [
  {
    name: "Starter",
    monthly: 19,
    yearly: 190,
    description: "For solo builders and early-stage products.",
    features: ["Core component library", "Basic theme controls", "Email support"],
  },
  {
    name: "Pro",
    monthly: 49,
    yearly: 490,
    description: "For teams shipping multiple product surfaces.",
    featured: true,
    features: [
      "Everything in Starter",
      "Advanced motion presets",
      "Team workspaces",
      "Priority support",
    ],
  },
  {
    name: "Team",
    monthly: 99,
    yearly: 990,
    description: "For larger organizations with strict delivery cycles.",
    features: [
      "Everything in Pro",
      "Custom onboarding",
      "Audit logs",
      "Dedicated success manager",
    ],
  },
];

export const comparisonRows = [
  {
    feature: "Component Library",
    starter: "Core",
    pro: "Full",
    team: "Full + Custom",
  },
  {
    feature: "Motion Presets",
    starter: "Limited",
    pro: "Advanced",
    team: "Advanced",
  },
  {
    feature: "Analytics",
    starter: "-",
    pro: "Included",
    team: "Included",
  },
  {
    feature: "Support",
    starter: "Email",
    pro: "Priority",
    team: "Dedicated",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Can we use Nebula in production products?",
    answer:
      "Yes. Nebula is built for production SaaS teams and supports modern app architectures.",
  },
  {
    question: "Do you provide dark and light themes?",
    answer:
      "Yes. Tokens and component states are designed for both themes out of the box.",
  },
  {
    question: "Is the motion system customizable?",
    answer:
      "You can tune durations, easing, and viewport triggers to match your brand behavior.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most teams integrate their first screens in less than a day using ready-made blocks.",
  },
  {
    question: "Do you support enterprise security requirements?",
    answer:
      "The Team plan includes audit logs, security reviews, and dedicated onboarding support.",
  },
];

export const docsNavigation = [
  "Getting Started",
  "Installation",
  "Usage",
  "Theming",
  "Components",
  "Deployment",
];
