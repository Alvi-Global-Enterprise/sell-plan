"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Logo from "@/components/Logo";
import { readSession, type AuthSession } from "@/lib/auth";
import { adminNavItems } from "@/lib/portal-data";
import UserMenu from "@/components/portal/UserMenu";
import {
  CloseIcon,
  MenuIcon,
  portalIconMap,
} from "@/components/portal/PortalIcons";

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  const Nav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {adminNavItems.map((item) => {
        const Icon = portalIconMap[item.icon];
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-semibold transition ${
              active
                ? "bg-white/12 text-white"
                : "text-[#9FB0C7] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const displayName = session?.name ?? "Staff";

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-[#0B1B32]">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col bg-[#0B1B32] lg:flex">
          <div className="flex h-16 items-center border-b border-white/10 px-5">
            <Logo tone="dark" size="nav" />
          </div>
          <p className="px-5 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#6B849F]">
            Staff admin
          </p>
          <Nav />
          <div className="border-t border-white/10 p-4 text-[11px] text-[#8FA3BA]">
            <p className="font-semibold text-white">{displayName}</p>
            <p className="mt-0.5 truncate">{session?.email}</p>
            <p className="mt-1">@{session?.username}</p>
            <p className="mt-3 text-[11px] text-[#6B849F]">
              Use the profile menu (top right) to log out.
            </p>
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
            <aside className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-[#0B1B32] shadow-2xl">
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
                <Logo tone="dark" size="nav" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/15 text-white"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
              <Nav onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-[#D9E1EC] bg-white/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#E3E8EF] lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
              <div>
                <p className="text-[12px] font-medium text-[#8B93A3]">
                  SellPlan staff
                </p>
                <p className="text-[14px] font-bold text-[#0B1B32]">
                  Admin portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <UserMenu session={session} variant="admin" />
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
