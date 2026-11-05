"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearSession,
  homeForRole,
  readSession,
  type AuthSession,
} from "@/lib/auth";

export default function AuthNavButtons({ className = "" }: { className?: string }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  if (!ready) {
    return <div className={`h-10 w-[180px] ${className}`} aria-hidden />;
  }

  if (session) {
    const home = homeForRole(session.role);
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Link
          href={home}
          className="sp-btn sp-btn-solid rounded-[6px] bg-[#00AEEF] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#0095cc]"
        >
          {session.role === "admin" ? "Admin portal" : "My office"}
        </Link>
        <button
          type="button"
          onClick={() => {
            clearSession();
            setSession(null);
            window.location.href = "/";
          }}
          className="sp-btn rounded-[6px] border border-white px-5 py-2 text-[13px] font-medium text-white hover:bg-white hover:text-[#0B1B32]"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link
        href="/signup"
        className="sp-btn rounded-[6px] border border-white px-5 py-2 text-[13px] font-medium text-white hover:bg-white hover:text-[#0B1B32]"
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        className="sp-btn sp-btn-solid rounded-[6px] bg-[#00AEEF] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#0095cc]"
      >
        Log In
      </Link>
    </div>
  );
}
