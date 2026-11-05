"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearSession,
  initials,
  type AuthSession,
} from "@/lib/auth";

export default function UserMenu({
  session,
  variant = "customer",
}: {
  session: AuthSession | null;
  variant?: "customer" | "admin";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function logout() {
    clearSession();
    setOpen(false);
    router.replace("/login");
  }

  const name = session?.name ?? (variant === "admin" ? "Staff" : "Customer");
  const username = session?.username ?? "—";
  const email = session?.email ?? "";
  const avatar = initials(name) || (variant === "admin" ? "AD" : "CU");
  const accent =
    variant === "admin" ? "bg-[#0B1B32] text-white" : "bg-[#00AEEF] text-white";

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-2 rounded-[10px] border border-[#E3E8EF] bg-[#F8FAFC] px-2.5 transition hover:border-[#00AEEF]"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${accent}`}
        >
          {avatar}
        </span>
        <span className="hidden max-w-[110px] truncate text-left text-[12px] font-semibold text-[#0B1B32] sm:block">
          {username}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`text-[#8B93A3] transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-[240px] overflow-hidden rounded-[12px] border border-[#E3E8EF] bg-white shadow-[0_16px_40px_-20px_rgba(11,27,54,0.45)]"
        >
          <div className="border-b border-[#E3E8EF] px-3 py-3">
            <p className="truncate text-[13px] font-bold text-[#0B1B32]">
              {name}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-[#6B7280]">
              @{username}
            </p>
            <p className="truncate text-[11px] text-[#6B7280]">{email}</p>
            <span
              className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                variant === "admin"
                  ? "bg-[#0B1B32] text-white"
                  : "bg-[#E6F7FE] text-[#00AEEF]"
              }`}
            >
              {variant === "admin" ? "Admin" : "Customer"}
            </span>
          </div>

          <div className="p-1.5">
            {variant === "customer" ? (
              <Link
                href="/portal/account"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-[8px] px-3 py-2.5 text-[13px] font-semibold text-[#0B1B32] hover:bg-[#F5F7FA]"
              >
                Account settings
              </Link>
            ) : null}
            <Link
              href="/"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-[8px] px-3 py-2.5 text-[13px] font-semibold text-[#0B1B32] hover:bg-[#F5F7FA]"
            >
              View public site
            </Link>
            <p className="px-3 pb-1 text-[10px] leading-snug text-[#8B93A3]">
              You stay signed in — use My office on the site to return without
              logging in again.
            </p>
            <button
              type="button"
              role="menuitem"
              onClick={logout}
              className="mt-1 flex w-full items-center justify-between rounded-[8px] bg-[#FFF5F5] px-3 py-2.5 text-left text-[13px] font-bold text-[#C0392B] hover:bg-[#FFE8E8]"
            >
              Log out
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
