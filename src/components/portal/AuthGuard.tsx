"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  clearSession,
  homeForRole,
  readSession,
  type AuthSession,
  type UserRole,
} from "@/lib/auth";

export function useAuthSession() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  function logout() {
    clearSession();
    setSession(null);
  }

  function refresh() {
    setSession(readSession());
  }

  return { session, ready, logout, refresh };
}

export default function AuthGuard({
  role,
  children,
}: {
  role: UserRole;
  children: ReactNode;
}) {
  const router = useRouter();
  const { session, ready } = useAuthSession();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (session.role !== role) {
      router.replace(homeForRole(session.role));
    }
  }, [ready, session, role, router]);

  if (!ready || !session || session.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FA] text-[14px] text-[#5B6577]">
        Checking access…
      </div>
    );
  }

  return <>{children}</>;
}
