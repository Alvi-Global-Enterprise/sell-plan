import Link from "next/link";
import Logo from "./Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "./icons";

const columns = [
  {
    title: "Quick Links",
    links: ["Home", "Explore Businesses", "Business Plans", "Investors"],
  },
  {
    title: "Resources",
    links: ["AI Tools", "Articles", "Webinars & Events", "Pricing"],
  },
  {
    title: "About",
    links: ["About SellPlan", "Contact Us", "Support", "Terms & Privacy"],
  },
];

const socials = [
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "X", Icon: XIcon },
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "YouTube", Icon: YouTubeIcon },
];

export default function Footer() {
  return (
    <footer className="bg-white text-[#0B1B32]">
      <div className="sp-container py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1.9fr_1.35fr] lg:gap-8 xl:gap-12">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo tone="light" size="footer" />
            <p className="mt-4 max-w-[260px] text-[13px] leading-relaxed text-[#5B6577]">
              Connecting businesses, buyers and investors to new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-1">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-[#0B1B32]">
                  {c.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="sp-footer-link text-[13px] text-[#5B6577]"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="min-w-0 md:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#00AEEF]">
              Newsletter
            </p>
            <h3 className="mt-2 text-[18px] font-extrabold leading-tight text-[#0B1B32] sm:text-[20px]">
              Stay in the Loop
            </h3>
            <form className="mt-4 flex max-w-full" action="#">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Send Your Email"
                className="h-11 min-w-0 flex-1 rounded-l-[8px] border border-r-0 border-[#E3E8EF] bg-[#F5F7FA] px-3 text-[13px] text-[#0B1B32] placeholder:text-[#9AA3B2] focus:border-[#00AEEF] focus:outline-none sm:px-4"
              />
              <button
                type="submit"
                className="sp-btn sp-btn-solid h-11 shrink-0 rounded-r-[8px] bg-[#00AEEF] px-3 text-[11px] font-extrabold uppercase tracking-wide text-white hover:bg-[#0095cc] sm:px-5 sm:text-[12px]"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-5 flex gap-3">
              {socials.map(({ label, Icon }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="sp-btn flex h-9 w-9 items-center justify-center rounded-full text-[#00AEEF] hover:bg-[#e6f7fe] hover:text-[#0095cc]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#E3E8EF] pt-5 text-xs text-[#5B6577] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SellPlan.com. All rights reserved.</p>
          <p>Connecting business opportunities across the UK.</p>
        </div>
      </div>
    </footer>
  );
}
