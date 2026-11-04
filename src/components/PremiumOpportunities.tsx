import {
  CalendarEventIcon,
  InvestorAccessIcon,
  MegaphoneAdIcon,
  ProfessionalServicesIcon,
  StarPromoIcon,
} from "./icons";

const items = [
  {
    title: "Promoted Listings",
    body: "Increase visibility for your business advertisements.",
    icon: StarPromoIcon,
  },
  {
    title: "Business Advertising",
    body: "Advertise your products and services on the platform.",
    icon: MegaphoneAdIcon,
  },
  {
    title: "Investor Access",
    body: "Connect with potential investors and shareholders.",
    icon: InvestorAccessIcon,
  },
  {
    title: "Webinars & Events",
    body: "Join paid educational sessions and business events.",
    icon: CalendarEventIcon,
  },
  {
    title: "Professional Services",
    body: "Optional support for business plans, listings and growth.",
    icon: ProfessionalServicesIcon,
  },
];

export default function PremiumOpportunities() {
  return (
    <section id="premium" className="bg-[#F5F5F5] py-10 sm:py-12 lg:py-14">
      <div className="sp-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
          <div className="shrink-0 lg:w-[240px] xl:w-[280px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#00AEEF]">
              More Ways to Grow
            </p>
            <h2 className="mt-1.5 font-display text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#0B1B32] sm:text-[32px] lg:text-[36px]">
              Premium
              <br className="hidden lg:block" /> Opportunities
            </h2>
          </div>

          <ul className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-3">
            {items.map(({ title, body, icon: Icon }) => (
              <li
                key={title}
                className="rounded-[14px] border border-[#E8ECF1] bg-white px-3.5 py-4 text-center shadow-[0_8px_24px_-14px_rgba(11,27,54,0.16)] md:min-h-[150px]"
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center text-[#00AEEF]">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-2.5 text-[13px] font-extrabold leading-tight text-[#0B1B32]">
                  {title}
                </h3>
                <p className="mt-1.5 text-[11px] leading-snug text-[#6B7280]">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
