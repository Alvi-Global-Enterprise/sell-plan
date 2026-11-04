import Link from "next/link";
import Logo from "./Logo";
import { MenuIcon } from "./icons";

const links = [
  { label: "Home", href: "#", active: true },
  { label: "Explore Businesses", href: "#featured" },
  { label: "Business Plans", href: "#ai-planning" },
  { label: "Investors", href: "#membership" },
  { label: "AI Tools", href: "#ai-planning" },
  { label: "Resources", href: "#how-it-works" },
  { label: "Pricing", href: "#membership" },
];

function AuthButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link
        href="#"
        className="sp-btn rounded-[6px] border border-white px-5 py-2 text-[13px] font-medium text-white hover:bg-white hover:text-[#0B1B32]"
      >
        Sign Up
      </Link>
      <Link
        href="#"
        className="sp-btn sp-btn-solid rounded-[6px] bg-[#00AEEF] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#0095cc]"
      >
        Log In
      </Link>
    </div>
  );
}

export default function Navbar() {
  return (
    <header className="sp-nav absolute inset-x-0 top-0 z-30 bg-[rgba(4,10,22,0.55)] backdrop-blur-[2px]">
      <div className="sp-container">
        <div className="flex h-[64px] items-center justify-between gap-4 lg:h-[72px]">
          <Logo className="shrink-0" />

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-6"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`relative whitespace-nowrap py-1.5 text-[13px] transition duration-200 ${
                  l.active
                    ? "font-semibold text-white after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-[#00AEEF]"
                    : "sp-link-underline font-medium text-white/65 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <AuthButtons className="hidden shrink-0 lg:flex" />

          <details className="group relative lg:hidden">
            <summary
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[6px] border border-white/60 text-white"
              aria-label="Toggle menu"
            >
              <MenuIcon className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-12 z-50 w-[min(18rem,calc(100vw-2rem))] rounded-[12px] border border-white/10 bg-[#040c1c]/95 p-5 shadow-2xl backdrop-blur">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={`rounded-[8px] px-3 py-2.5 text-sm font-medium ${
                      l.active
                        ? "bg-white/10 text-[#00AEEF]"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <AuthButtons className="mt-4 flex-col gap-2 [&>a]:w-full [&>a]:text-center sm:flex-row sm:[&>a]:flex-1" />
            </div>
          </details>
        </div>
      </div>
      <div className="h-px w-full bg-white/20" />
    </header>
  );
}
