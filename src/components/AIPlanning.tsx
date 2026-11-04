import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "./icons";
import Reveal from "./Reveal";

const bullets = [
  "AI Business Plan Generator",
  "Market Research & Analysis",
  "Financial Forecasts",
  "Marketing Strategies",
  "Business Growth Ideas",
];

export default function AIPlanning() {
  return (
    <section
      id="ai-planning"
      className="relative isolate overflow-hidden bg-white"
    >
      {/*
        Mobile/tablet: image band + readable white content panel.
        Desktop (lg+): full-bleed asset with text over the right side.
      */}
      <div className="relative mx-auto w-full max-w-[1920px] lg:aspect-[1920/823]">
        <div className="relative h-[220px] w-full sm:h-[280px] md:h-[340px] lg:absolute lg:inset-0 lg:h-auto">
          <Image
            src="/assets/smarter-business-planning-ai.png"
            alt="AI Business Plan Generator on a laptop"
            fill
            sizes="100vw"
            quality={95}
            priority={false}
            className="object-cover object-[20%_center] sm:object-[30%_center] lg:object-center"
          />
        </div>

        <div className="relative bg-white lg:absolute lg:inset-0 lg:bg-transparent">
          <div className="sp-container flex h-full items-center justify-end py-8 sm:py-10 lg:py-12">
            <Reveal variant="right" className="w-full max-w-[440px] rounded-[14px] bg-white p-5 shadow-[0_10px_30px_-16px_rgba(11,27,54,0.2)] sm:p-6 lg:max-w-[440px] lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#00AEEF]">
                AI-Powered Business Tools
              </p>
              <h2 className="mt-1.5 font-display text-[24px] font-extrabold leading-[1.15] tracking-tight text-[#0B1B32] sm:text-[28px] lg:text-[32px]">
                Smarter Business Planning with AI
              </h2>
              <p className="mt-3 text-[12px] leading-relaxed text-[#6B7280] sm:text-[13px]">
                Get expert assistance to create professional business plans,
                market research, financial forecasts and more — powered by AI.
              </p>

              <ul className="mt-5 space-y-2.5">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 text-[13px] font-semibold text-[#0B1B32] transition hover:translate-x-0.5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00AEEF] text-white">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                href="#"
                className="sp-btn sp-btn-solid sp-btn-arrow mt-6 inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#00AEEF] px-5 text-[13px] font-bold text-white hover:bg-[#0095cc]"
              >
                Try AI Tools
                <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.4} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
