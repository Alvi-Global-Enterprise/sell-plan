import type { ReactNode } from "react";
import {
  CalendarPlanIcon,
  NetworkIcon,
  SearchListIcon,
  TargetOpportunityIcon,
} from "./icons";
import Reveal from "./Reveal";

const steps: { n: string; title: string; body: string; icon: ReactNode }[] = [
  {
    n: "01",
    title: "List or Explore",
    body: "Business owners can list their businesses, while buyers and investors can explore verified opportunities.",
    icon: <SearchListIcon className="h-8 w-8" />,
  },
  {
    n: "02",
    title: "Connect",
    body: "Connect with potential buyers, sellers, investors and professionals through our marketplace and community.",
    icon: <NetworkIcon className="h-8 w-8" />,
  },
  {
    n: "03",
    title: "Plan & Grow",
    body: "Use our AI tools to create business plans, get insights and plan for growth.",
    icon: <CalendarPlanIcon className="h-8 w-8" />,
  },
  {
    n: "04",
    title: "Make Opportunities",
    body: "Buy, sell, invest and collaborate to take your business to the next level.",
    icon: <TargetOpportunityIcon className="h-8 w-8" />,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F5F7FA] py-10 sm:py-12 lg:py-14">
      <div className="sp-container">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#00AEEF]">
              Simple. Effective. For Everyone.
            </p>
            <h2 className="mt-1.5 font-display text-[24px] font-extrabold leading-tight tracking-tight text-[#0B1B32] sm:text-[28px] lg:text-[32px]">
              How SellPlan.com Works
            </h2>
          </div>
          <p className="max-w-[340px] text-[12px] leading-relaxed text-[#6B7280] sm:text-right sm:text-[13px] lg:max-w-[380px]">
            A simple and secure platform for business owners, buyers, sellers,
            and entrepreneurs.
          </p>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-5">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              variant={i % 2 === 0 ? "up" : "blur"}
              delayMs={i * 150}
              className="sp-card rounded-[16px] bg-white px-5 pb-6 pt-7 text-center shadow-[0_8px_28px_rgba(11,27,54,0.08)]"
            >
              <div
                className="sp-icon-pop sp-float relative mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E6F7FE] text-[#00AEEF]"
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                {s.icon}
                <span className="absolute -left-0.5 -top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#00AEEF] text-[10px] font-extrabold text-white ring-[3px] ring-white">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-5 text-[13px] font-extrabold uppercase tracking-[0.06em] text-[#0B1B32]">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[12px] leading-relaxed text-[#6B7280]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
