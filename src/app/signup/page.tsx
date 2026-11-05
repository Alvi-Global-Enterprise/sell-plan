"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import Logo from "@/components/Logo";
import { PortalButton } from "@/components/portal/ui";
import {
  homeForRole,
  readSession,
  registerCustomer,
  saveSession,
} from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const session = readSession();
    if (session) router.replace(homeForRole(session.role));
  }, [router]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const first = String(data.get("first") ?? "");
    const last = String(data.get("last") ?? "");
    const result = registerCustomer({
      username: String(data.get("username") ?? ""),
      email: String(data.get("email") ?? ""),
      name: `${first} ${last}`.trim(),
      password: String(data.get("password") ?? ""),
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    saveSession(result.user);
    router.replace(homeForRole(result.user.role));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F7FA] px-4 py-10">
      <div className="w-full max-w-[480px] rounded-[18px] border border-[#E3E8EF] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(11,27,54,0.35)] sm:p-8">
        <Logo tone="light" />
        <h1 className="mt-6 font-display text-[26px] font-extrabold text-[#0B1B32]">
          Create your free account
        </h1>
        <p className="mt-2 text-[14px] text-[#5B6577]">
          New signups are always <strong>customer</strong> accounts. Staff /
          admin access is by assigned username or @sellplan.com email only.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                First name
              </span>
              <input
                name="first"
                required
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Last name
              </span>
              <input
                name="last"
                required
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-[12px] font-semibold text-[#0B1B32]">
              Username
            </span>
            <input
              name="username"
              required
              autoComplete="username"
              placeholder="yourname"
              className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-semibold text-[#0B1B32]">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
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
              minLength={6}
              autoComplete="new-password"
              className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
            />
          </label>
          <label className="flex items-start gap-2 text-[12px] text-[#5B6577]">
            <input type="checkbox" required className="mt-0.5" />
            I agree to the Terms & Privacy and understand SellPlan signposts
            external providers.
          </label>

          {error ? (
            <p className="rounded-[8px] border border-[#F5C6C6] bg-[#FFF5F5] px-3 py-2 text-[12px] font-medium text-[#C0392B]">
              {error}
            </p>
          ) : null}

          <PortalButton type="submit" className="w-full">
            Create customer account
          </PortalButton>
        </form>

        <p className="mt-5 text-center text-[13px] text-[#5B6577]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#00AEEF]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
