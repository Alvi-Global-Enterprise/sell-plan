import Link from "next/link";
import { CheckIcon } from "./icons";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

type Plan = {
  name: string;
  badge: string;
  badgeTone: "available" | "soon";
  price?: string;
  priceNote?: string;
  subtitle?: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    badge: "Available",
    badgeTone: "available",
    price: "£19.99",
    priceNote: "/month",
    features: [
      "One active business advertisement or business-plan listing",
      "Basic profile and customer portal",
      "Access to community chatroom",
      "Basic AI business-plan assistance",
      "Standard listing visibility",
    ],
    cta: "GET STARTED",
    featured: true,
  },
  {
    name: "Professional",
    badge: "Coming Soon",
    badgeTone: "soon",
    subtitle: "For Growing Businesses",
    features: [
      "More listings and greater visibility",
      "Advanced AI tools",
      "Investor access features",
      "Priority support",
      "And more...",
    ],
    cta: "JOIN WAITLIST",
  },
  {
    name: "Investor",
    badge: "Coming Soon",
    badgeTone: "soon",
    subtitle: "For Serious Investors",
    features: [
      "Access to investment opportunities",
      "Premium search and filters",
      "Direct contact with business owners",
      "Exclusive webinars and events",
      "And more...",
    ],
    cta: "JOIN WAITLIST",
  },
];

export default function MembershipPlans() {
  return (
    <section id="membership" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="sp-container">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#00AEEF]">
              Flexible Options for Your Goals
            </p>
            <h2 className="mt-1.5 font-display text-[24px] font-extrabold leading-tight tracking-tight text-[#0B1B32] sm:text-[28px] lg:text-[32px]">
              Membership Plans
            </h2>
          </div>
          <p className="max-w-[340px] text-[12px] leading-relaxed text-[#6B7280] sm:text-right sm:text-[13px] lg:max-w-[380px]">
            Choose a plan that fits your needs and unlock more opportunities on
            SellPlan.com.
          </p>
        </Reveal>

        <div className="mx-auto mt-7 grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-8 lg:grid-cols-3 lg:gap-5">
          {plans.map((p, i) => {
            const muted = !p.featured;
            return (
              <Reveal
                key={p.name}
                variant={p.featured ? "scale" : "up"}
                delayMs={i * 160}
                className="h-full"
              >
              <TiltCard
                className={`sp-card relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[16px] bg-white px-6 pb-7 pt-7 sm:min-h-[460px] ${
                  p.featured
                    ? "sp-glow-pulse border-2 border-[#00AEEF]"
                    : "border border-[#E3E8EF] shadow-[0_8px_24px_-14px_rgba(11,27,54,0.12)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${
                      muted ? "text-[#9AA3B2]" : "text-[#00AEEF]"
                    }`}
                  >
                    {p.name}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold leading-none ${
                      p.badgeTone === "available"
                        ? "bg-[#00C38B] text-white"
                        : "bg-[#E6F7FE] text-[#00AEEF]"
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>

                <div className="mt-5 min-h-[48px]">
                  {p.price ? (
                    <div className="flex items-end gap-1">
                      <span className="font-display text-[32px] font-black leading-none tracking-tight text-[#0B1B32] sm:text-[36px]">
                        {p.price}
                      </span>
                      <span className="pb-1 text-[12px] font-semibold text-[#6B7280]">
                        {p.priceNote}
                      </span>
                    </div>
                  ) : (
                    <p
                      className={`font-display text-[17px] font-extrabold leading-snug ${
                        muted ? "text-[#8B93A3]" : "text-[#0B1B32]"
                      }`}
                    >
                      {p.subtitle}
                    </p>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3.5">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-[12px] leading-snug ${
                        muted
                          ? "font-medium text-[#9AA3B2]"
                          : "font-medium text-[#0B1B32]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full ${
                          muted
                            ? "bg-[#EAF1F6] text-[#A8B3C2]"
                            : "bg-[#E6F7FE] text-[#00AEEF]"
                        }`}
                      >
                        <CheckIcon className="h-2.5 w-2.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#"
                  className={`sp-btn relative z-[1] mt-8 flex h-11 items-center justify-center rounded-[8px] text-[12px] font-extrabold tracking-wider ${
                    p.featured
                      ? "sp-btn-solid bg-[#00AEEF] text-white hover:bg-[#0095cc]"
                      : "border border-[#D5DCE6] bg-white text-[#8B93A3] hover:border-[#00AEEF] hover:text-[#00AEEF]"
                  }`}
                >
                  <span>{p.cta}</span>
                </Link>
              </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
