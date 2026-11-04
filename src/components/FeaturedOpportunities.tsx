"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";

type Item = {
  category: string;
  title: string;
  location: string;
  description: string;
  image: string;
};

const tabs = [
  "Businesses for Sale",
  "Business Plans",
  "Investment Opportunities",
] as const;

/** Assets are 387×191 (~2:1) — match that so crop matches Figma cards */
const businessesForSale: Item[] = [
  {
    category: "Hospitality",
    title: "Popular Café and Coffee Shop",
    location: "London, UK",
    description:
      "Established café in a prime location with loyal customer base and growth potential.",
    image: "/assets/explorethemarketplace/popularcafe.png",
  },
  {
    category: "Fitness",
    title: "Modern Gym & Fitness Centre",
    location: "Manchester, UK",
    description:
      "Fully equipped gym with 1,200+ members and multiple revenue streams.",
    image: "/assets/explorethemarketplace/gym.png",
  },
  {
    category: "E-commerce",
    title: "Profitable Online Retail Business",
    location: "Birmingham, UK",
    description:
      "Established e-commerce store with strong brand and consistent revenue.",
    image: "/assets/explorethemarketplace/ecommerce.png",
  },
  {
    category: "Construction",
    title: "Construction Services Business",
    location: "Leeds, UK",
    description:
      "Well-established construction company with excellent reputation and repeat clients.",
    image: "/assets/explorethemarketplace/construction.png",
  },
];

const data: Record<(typeof tabs)[number], Item[]> = {
  "Businesses for Sale": businessesForSale,
  "Business Plans": businessesForSale.map((item, i) => ({
    ...item,
    category: ["Retail Plan", "Fitness Plan", "E-com Plan", "Construction Plan"][
      i
    ]!,
    title: [
      "Café Launch Business Plan",
      "Gym Expansion Blueprint",
      "Online Retail Growth Plan",
      "Contractor Growth Plan",
    ][i]!,
    description: [
      "Complete café launch plan with market research, forecasts and growth roadmap.",
      "Investor-ready plan covering membership tiers, equipment and go-to-market.",
      "Scaling plan with unit economics, ad strategy and fulfilment analysis.",
      "Step-by-step plan for expanding capacity, pipeline and regional coverage.",
    ][i]!,
  })),
  "Investment Opportunities": businessesForSale.map((item, i) => ({
    ...item,
    title: [
      "Café Partnership Opportunity",
      "Fitness Centre Investment",
      "Online Retail Growth Round",
      "Construction Equity Stake",
    ][i]!,
    description: [
      "Seeking investors for a high-street café expansion with strong footfall.",
      "Equity opportunity in a growing gym with recurring membership revenue.",
      "Revenue-generating store raising capital to scale brand and inventory.",
      "Established contractor offering investor participation in project pipeline.",
    ][i]!,
  })),
};

function LocationPin({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M8 1.5a4.75 4.75 0 0 0-4.75 4.75c0 3.35 4.75 8.25 4.75 8.25s4.75-4.9 4.75-8.25A4.75 4.75 0 0 0 8 1.5Zm0 6.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z" />
    </svg>
  );
}

export default function FeaturedOpportunities() {
  const [active, setActive] = useState<(typeof tabs)[number]>(tabs[0]);
  const items = data[active];

  return (
    <section id="featured" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="sp-container">
        {/* Header: title left + View All top-right (Figma) */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#00AEEF]">
              Featured Opportunities
            </p>
            <h2 className="mt-1.5 font-display text-[24px] font-extrabold leading-tight tracking-tight text-[#0B1B32] sm:text-[28px] lg:text-[32px]">
              Explore the Marketplace
            </h2>
          </div>

          <Link
            href="#"
            className="mt-0.5 hidden h-9 shrink-0 items-center justify-center gap-2 rounded-[8px] border border-[#0B1B32] px-4 text-[12px] font-bold text-[#00AEEF] transition hover:bg-[#0B1B32] hover:text-white sm:mt-4 sm:inline-flex"
          >
            View All Listings
            <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
          </Link>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Marketplace categories"
          className="mt-5 flex flex-wrap gap-2.5"
        >
          {tabs.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(t)}
                className={`rounded-full border px-4 py-2 text-[12px] font-semibold transition sm:px-5 sm:py-2.5 sm:text-[13px] ${
                  isActive
                    ? "border-[#00AEEF] bg-[#00AEEF] text-white"
                    : "border-[#0B1B32] bg-white text-[#0B1B32] hover:border-[#00AEEF] hover:text-[#00AEEF]"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <Link
          href="#"
          className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-[8px] border border-[#0B1B32] px-4 text-[12px] font-bold text-[#00AEEF] sm:hidden"
        >
          View All Listings
          <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
        </Link>

        {/* Cards — asset ratio 387:191 */}
        <div
          role="tabpanel"
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-5 lg:mt-6 lg:grid-cols-4 lg:gap-5"
        >
          {items.map((item) => (
            <article
              key={`${active}-${item.title}`}
              className="flex flex-col rounded-[14px] bg-white shadow-[0_6px_24px_rgba(11,27,54,0.1)]"
            >
              <div className="relative">
                <div className="relative aspect-[387/191] w-full overflow-hidden rounded-t-[14px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <span
                  className="pointer-events-none absolute left-3 z-20 rounded-[6px] bg-[#00AEEF] px-3.5 py-2 text-[12px] font-bold leading-none text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                  style={{ top: "100%", transform: "translateY(-50%)" }}
                >
                  {item.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-5">
                <h3 className="min-h-[40px] text-[14px] font-extrabold leading-snug text-[#0B1B32]">
                  {item.title}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#6B7280]">
                  <LocationPin className="h-3 w-3 shrink-0 text-[#00AEEF]" />
                  {item.location}
                </p>
                <p className="mt-1.5 flex-1 text-[11px] leading-[1.5] text-[#6B7280] sm:text-[12px]">
                  {item.description}
                </p>
                <Link
                  href="#"
                  className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[7px] border border-[#0B1B32] text-[12px] font-bold text-[#00AEEF] transition hover:bg-[#0B1B32] hover:text-white"
                >
                  View Details
                  <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
