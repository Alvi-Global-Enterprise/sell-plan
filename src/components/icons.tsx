import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={3} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M7.8 12.3l3 3 5.4-6" />
    </svg>
  );
}

/** Figma trust ticks: solid dark circle + white check */
export function TrustTickIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <circle cx="10" cy="10" r="10" fill="#1A2333" />
      <path
        d="M5.6 10.2l2.7 2.7 6.1-6.2"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SearchListIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3.5" width="12" height="17" rx="2" />
      <path d="M7.5 8h5M7.5 11.5h5M7.5 15h3" />
      <circle cx="17" cy="16.5" r="3" />
      <path d="M19.2 18.7L21.5 21" />
    </svg>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M10.8 7.2L6.2 15.8M13.2 7.2l4.6 8.6M7.5 18h9" />
    </svg>
  );
}

export function ChartPlanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 15l4-4 3 3 5-6" />
      <path d="M16 8h4v4" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11l4-4 4 1 3-2 4 3 3 1v5l-3 1" />
      <path d="M3 11v5l3 1" />
      <path d="M7 17l3 2c.8.5 1.8.3 2.3-.4l.4-.6" />
      <path d="M10 15l2.5 2.2c.7.6 1.8.5 2.3-.2.5-.7.4-1.7-.3-2.2L12 13" />
    </svg>
  );
}

/** How-it-works step 03 — calendar / planner */
export function CalendarPlanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" />
      <path d="M8 14h2M12 14h2M16 14h0.5M8 17h2M12 17h2" />
    </svg>
  );
}

/** How-it-works step 04 — target / opportunity */
export function TargetOpportunityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.4V21h3.1z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L1.9 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.5 9h3.9v11.5H4.5V9zM6.4 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zM10.8 9h3.7v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6v6h-3.9v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8v5.4h-3.9V9z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.9} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C18.5 5.2 12 5.2 12 5.2s-6.5 0-8.8.5c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 2.3.5 8.8.5 8.8.5s6.5 0 8.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l6.3 3.3-6.3 3.3z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.2 16.2L21 21" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function PlanDocIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3.5h7.5L19 8v12.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z" />
      <path d="M14 3.5V8h4.5M8.5 12h7M8.5 15.5h7M8.5 19h4" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.6-3.5 4-5 7-5s5.4 1.5 7 5" />
    </svg>
  );
}

/** Join CTA — person with plus */
export function UserPlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M3.5 19.5c1.3-3 3.3-4.4 6-4.4 1.3 0 2.5.3 3.5 1" />
      <path d="M17 10v8M13 14h8" />
    </svg>
  );
}

export function StarPromoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <path
        d="M24 6l4.9 10.5L40 18.2l-8 7.4L34 38 24 32.2 14 38l2-12.4-8-7.4 11.1-1.7L24 6z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MegaphoneAdIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <path
        d="M8 20.5c0-1.4 1.1-2.5 2.5-2.5H16l16-8.5v25L16 26H10.5A2.5 2.5 0 0 1 8 23.5v-3z"
        fill="currentColor"
      />
      <path
        d="M14 28.5l1.8 8c.2.9 1.1 1.5 2 1.3l2.2-.5c.9-.2 1.4-1.1 1.2-2l-1.5-6.8"
        fill="currentColor"
      />
      <path
        d="M36 18.5c1.6 1.5 2.5 3.2 2.5 5.2s-.9 3.7-2.5 5.2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InvestorAccessIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <circle cx="24" cy="15" r="8" fill="currentColor" />
      <path
        d="M8 40c0-7.2 7.2-12 16-12s16 4.8 16 12"
        fill="currentColor"
      />
      <circle cx="24" cy="15" r="4.2" fill="#fff" />
      <path
        d="M24 11.2v7.6M21.6 13.2c.5-.7 1.3-1.1 2.4-1.1 1.5 0 2.5.8 2.5 2s-1 2-2.5 2c-1.1 0-1.9-.3-2.4-.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalendarEventIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <rect x="8" y="12" width="32" height="28" rx="4" fill="currentColor" />
      <path d="M8 20h32" stroke="#fff" strokeWidth="2.5" />
      <path
        d="M16 8v6M32 8v6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="14" y="26" width="6" height="6" rx="1" fill="#fff" />
      <rect x="21" y="26" width="6" height="6" rx="1" fill="#fff" />
      <rect x="28" y="26" width="6" height="6" rx="1" fill="#fff" />
    </svg>
  );
}

/** Premium — handshake / professional services */
export function ProfessionalServicesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <path
        d="M8 22.5c0-1.4 1.1-2.5 2.5-2.5H16l3.2-3.8A3 3 0 0 1 21.5 15H26a3 3 0 0 1 2.4 1.2L32 21h5.5c1.4 0 2.5 1.1 2.5 2.5V28c0 1.4-1.1 2.5-2.5 2.5H31l-3.5 4.2A3 3 0 0 1 25.2 36h-4.4a3 3 0 0 1-2.3-1.1L15 30H10.5A2.5 2.5 0 0 1 8 27.5v-5z"
        fill="currentColor"
      />
      <path
        d="M18 24.5h12M20.5 28h7"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
