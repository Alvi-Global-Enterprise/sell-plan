"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import Logo from "@/components/Logo";
import { PortalButton } from "@/components/portal/ui";
import {
  authenticate,
  homeForRole,
  readSession,
  saveSession,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = readSession();
    if (session) router.replace(homeForRole(session.role));
  }, [router]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const identifier = String(data.get("identifier") ?? "");
    const password = String(data.get("password") ?? "");

    const result = authenticate(identifier, password);
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    saveSession(result.user);
    router.replace(homeForRole(result.user.role));
  }

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <div className="relative hidden w-[44%] overflow-hidden bg-[#040c1c] lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url(/assets/home-pic.png)" }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
          <Logo tone="dark" />
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#00AEEF]">
              SellPlan access
            </p>
            <h1 className="mt-3 font-display text-[36px] font-extrabold leading-tight">
              One login.
              <br />
              Right workspace.
            </h1>
            <p className="mt-3 max-w-sm text-[14px] text-white/75">
              We recognise your username or email and open either the customer
              office or the staff admin portal.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px] rounded-[18px] border border-[#E3E8EF] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(11,27,54,0.35)] sm:p-8">
          <div className="mb-6 lg:hidden">
            <Logo tone="light" />
          </div>
          <h2 className="font-display text-[26px] font-extrabold text-[#0B1B32]">
            Log in
          </h2>
          <p className="mt-2 text-[14px] text-[#5B6577]">
            Use your username or email — role is detected automatically.
          </p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Username or email
              </span>
              <input
                name="identifier"
                required
                autoComplete="username"
                placeholder="username or email"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Password
              </span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>

            {error ? (
              <p className="rounded-[8px] border border-[#F5C6C6] bg-[#FFF5F5] px-3 py-2 text-[12px] font-medium text-[#C0392B]">
                {error}
              </p>
            ) : null}

            <div className="rounded-[10px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 py-2.5 text-[11px] leading-relaxed text-[#5B6577]">
              <p className="font-bold text-[#0B1B32]">Demo accounts</p>
              <p className="mt-1">
                Admin: <span className="font-semibold">admin</span> /{" "}
                <span className="font-semibold">admin@sellplan.com</span> ·{" "}
                admin123
              </p>
              <p>
                Customer: <span className="font-semibold">customer</span> /{" "}
                <span className="font-semibold">customer@business.com</span> ·{" "}
                customer123
              </p>
            </div>

            <PortalButton type="submit" className="w-full">
              {loading ? "Signing in…" : "Continue"}
            </PortalButton>
          </form>

          <p className="mt-5 text-center text-[13px] text-[#5B6577]">
            New customer?{" "}
            <Link href="/signup" className="font-bold text-[#00AEEF]">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
