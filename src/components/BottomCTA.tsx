import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "./icons";

export default function BottomCTA() {
  return (
    <section
      id="cta"
      className="relative min-h-[340px] w-full overflow-hidden text-white sm:min-h-[300px] md:min-h-[280px] lg:aspect-[1906/345] lg:min-h-0"
    >
      <Image
        src="/assets/explorethemarketplace/turnyourbusiness.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-black/20 sm:bg-black/15" />

      <div className="sp-container relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-center px-4 py-10 text-center sm:py-8 lg:py-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#00AEEF] sm:text-[11px]">
          More Ways to Grow
        </p>

        <h2 className="mt-2 max-w-[900px] font-display text-[22px] font-extrabold leading-[1.15] tracking-tight sm:mt-2.5 sm:text-[28px] md:text-[32px] lg:text-[40px]">
          Turn Your Business Ideas into Opportunities
        </h2>
        <p className="mt-2 max-w-[640px] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-[11px] lg:text-[12px]">
          Join SellPlan.com today and be part of a growing business community.
        </p>

        <div className="mt-5 flex w-full max-w-md flex-col items-stretch justify-center gap-2.5 sm:mt-5 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <Link
            href="#"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#00AEEF] px-5 text-[11px] font-extrabold tracking-wide text-white transition hover:bg-[#0095cc] sm:h-11 sm:w-auto sm:px-6 sm:text-[12px]"
          >
            CREATE YOUR FREE ACCOUNT
            <ArrowRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
          <Link
            href="#featured"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] border border-white bg-transparent px-5 text-[11px] font-extrabold tracking-wide text-white transition hover:bg-white hover:text-[#0B1B32] sm:h-11 sm:w-auto sm:px-6 sm:text-[12px]"
          >
            EXPLORE BUSINESSES
            <SearchIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
