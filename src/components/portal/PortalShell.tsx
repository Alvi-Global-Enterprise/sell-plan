"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Logo from "@/components/Logo";
import { readSession, type AuthSession } from "@/lib/auth";
import { navItems } from "@/lib/portal-data";
import UserMenu from "@/components/portal/UserMenu";
import {
  BellIcon,
  CloseIcon,
  MenuIcon,
  portalIconMap,
} from "@/components/portal/PortalIcons";

export default function PortalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  const isActive = (href: string) =>
    href === "/portal" ? pathname === href : pathname.startsWith(href);

  const Nav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {navItems.map((item) => {
        const Icon = portalIconMap[item.icon];
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-semibold transition ${
              active
                ? "bg-[#E6F7FE] text-[#00AEEF]"
                : "text-[#5B6577] hover:bg-[#F5F7FA] hover:text-[#0B1B32]"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const displayName = session?.name ?? "Customer";

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0B1B32]">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-[#E3E8EF] bg-white lg:flex">
          <div className="flex h-16 items-center border-b border-[#E3E8EF] px-5">
            <Logo tone="light" size="nav" />
          </div>
          <p className="px-5 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9AA3B2]">
            Customer office
          </p>
          <Nav />
          <div className="space-y-3 border-t border-[#E3E8EF] p-4">
            <div className="rounded-[12px] bg-[#E6F7FE] p-3">
              <p className="text-[12px] font-bold text-[#0B1B32]">Starter plan</p>
              <p className="mt-1 text-[11px] text-[#5B6577]">
                Signed in as {session?.username ?? "customer"}
              </p>
              <Link
                href="/portal/membership"
                className="mt-3 inline-flex text-[12px] font-bold text-[#00AEEF]"
              >
                Manage plan →
              </Link>
            </div>
            <Link
              href="/portal/account"
              className="block rounded-[10px] border border-[#E3E8EF] px-3 py-2 text-center text-[12px] font-semibold text-[#0B1B32] hover:border-[#00AEEF]"
            >
              Account & log out
            </Link>
          </div>
        </aside>

        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-white shadow-2xl">
              <div className="flex h-16 items-center justify-between border-b border-[#E3E8EF] px-4">
                <Logo tone="light" size="nav" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#E3E8EF]"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
              <Nav onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-[#E3E8EF] bg-white/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#E3E8EF] lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
              <div className="hidden sm:block">
                <p className="text-[12px] font-medium text-[#8B93A3]">
                  Welcome back
                </p>
                <p className="text-[14px] font-bold text-[#0B1B32]">
                  {displayName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#E3E8EF] text-[#0B1B32]"
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#00AEEF]" />
              </button>
              <UserMenu session={session} variant="customer" />
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1180px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
