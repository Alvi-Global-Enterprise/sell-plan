"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  homeForRole,
  readSession,
  type AuthSession,
} from "@/lib/auth";
import {
  CalendarPlanIcon,
  PlusIcon,
  SearchIcon,
  UserPlusIcon,
} from "./icons";

export default function HeroAuthActions() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  const listHref = session
    ? session.role === "customer"
      ? "/portal/listings/new"
      : "/admin"
    : "/login";
  const joinHref = session ? homeForRole(session.role) : "/signup";
  const joinLabel = session
    ? session.role === "admin"
      ? "Open admin"
      : "Open my office"
    : "Join SellPlan";

  const actions = [
    {
      href: "#featured",
      label: "Explore Businesses",
      solid: true,
      Icon: SearchIcon,
    },
    {
      href: listHref,
      label: "List Your Business",
      solid: false,
      Icon: PlusIcon,
    },
    {
      href: "#ai-planning",
      label: "Create a Business Plan",
      solid: false,
      Icon: CalendarPlanIcon,
    },
    {
      href: joinHref,
      label: joinLabel,
      solid: true,
      Icon: UserPlusIcon,
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-2 p-2.5 sm:grid-cols-2 sm:gap-2.5 sm:p-3.5 lg:grid-cols-4 lg:p-4">
      {actions.map(({ href, label, solid, Icon }) => (
        <Link
          key={label}
          href={href}
          className={`sp-btn flex h-10 items-center justify-center gap-1.5 rounded-[7px] px-2 text-[11px] font-semibold sm:h-[36px] lg:px-1.5 ${
            solid
              ? "sp-btn-solid bg-[#00AEEF] text-white hover:bg-[#0095cc]"
              : "border border-[#00AEEF] bg-white text-[#00AEEF] hover:bg-[#e6f7fe]"
          }`}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
          <span className="truncate">{label}</span>
        </Link>
      ))}
    </div>
  );
}
