import {
  TrustTickIcon,
} from "./icons";
import HeroAuthActions from "./HeroAuthActions";

const trust = [
  "Real Business Opportunities",
  "AI-Powered Business Tools",
  "Verified Listings",
  "Investors & Networking",
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        backgroundColor: "#040c1c",
        backgroundImage: "url(/assets/home-pic.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div className="relative mx-auto w-full max-w-[1920px] lg:aspect-[1920/949]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,20,0.55)_0%,rgba(2,8,20,0.28)_55%,transparent_85%)] lg:bg-[linear-gradient(90deg,rgba(2,8,20,0.38)_0%,rgba(2,8,20,0.1)_48%,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,20,0.45)_0%,transparent_28%,transparent_70%,rgba(2,8,20,0.35)_100%)]"
        />

        <div className="relative lg:absolute lg:inset-0">
          <div className="sp-container flex h-full flex-col justify-end pb-7 pt-[88px] sm:pb-9 sm:pt-[96px] lg:pb-10 lg:pt-[80px]">
            <div className="sp-hero-copy max-w-[480px] text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#00AEEF] sm:text-[12px]">
                The Business Marketplace
              </p>

              <h1 className="mt-1.5 font-display font-extrabold uppercase tracking-[-0.03em]">
                <span className="sp-hero-line text-[18px] leading-[1.2] text-white sm:text-[22px] md:text-[24px] lg:text-[28px]">
                  <span>The All-in-One</span>
                </span>
                <span className="sp-hero-line mt-0.5 text-[28px] leading-[1.02] text-white sm:text-[36px] md:text-[42px] lg:text-[50px]">
                  <span>Business</span>
                </span>
                <span className="sp-hero-line text-[28px] leading-[1.02] sm:text-[36px] md:text-[42px] lg:text-[50px]">
                  <span className="sp-shimmer-text">Marketplace</span>
                </span>
              </h1>

              <p className="mt-2.5 max-w-[400px] text-[12px] leading-[1.55] text-white/80 sm:text-[13px] lg:text-[15px]">
                Connect with business owners, entrepreneurs, buyers, sellers and
                investors through business listings, business plans, professional
                networking and AI-powered business tools.
              </p>
            </div>

            <div className="sp-hero-cta mt-4 w-full max-w-[780px] overflow-hidden rounded-[10px] bg-white shadow-[0_12px_32px_-14px_rgba(0,0,0,0.55)] sm:mt-5">
              <HeroAuthActions />

              <div className="bg-[#DCF4FF] px-3 py-3 sm:px-4 sm:py-3.5">
                <ul className="sp-stagger grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between">
                  {trust.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-1.5 text-[11px] font-medium text-[#3A465A] sm:text-[10px] lg:text-[11px]"
                    >
                      <TrustTickIcon className="h-3.5 w-3.5 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
