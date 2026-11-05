"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearSession,
  readSession,
  type AuthSession,
} from "@/lib/auth";
import { PageHeader, Panel, PortalButton } from "@/components/portal/ui";

export default function AccountPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  function logout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Account"
        description="Profile, grant alerts, saved searches and email notifications for your business office."
        actions={
          <PortalButton variant="outline" onClick={logout}>
            Log out
          </PortalButton>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel className="space-y-4">
          <h2 className="text-[16px] font-extrabold text-[#0B1B32]">Profile</h2>
          {[
            ["Full name", session?.name ?? ""],
            ["Username", session?.username ?? ""],
            ["Email", session?.email ?? ""],
            ["Role", session?.role ?? "customer"],
            ["Business name", "Alvi Global Enterprise"],
            ["Country", "United Kingdom"],
          ].map(([label, value]) => (
            <label key={label} className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                {label}
              </span>
              <input
                defaultValue={value}
                readOnly={label === "Role" || label === "Username"}
                key={`${label}-${value}`}
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 text-[14px] outline-none focus:border-[#00AEEF] read-only:text-[#6B7280]"
              />
            </label>
          ))}
          <PortalButton>Save changes</PortalButton>
        </Panel>

        <div className="space-y-5">
          <Panel className="space-y-4">
            <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
              Email notifications
            </h2>
            {[
              "Grant & funding alerts (new opportunities)",
              "Saved search matches",
              "New webinars in my categories",
              "Listing enquiry emails",
              "Membership & billing updates",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center justify-between gap-3 rounded-[10px] border border-[#E3E8EF] px-3 py-3 text-[13px] font-medium text-[#0B1B32]"
              >
                {item}
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </label>
            ))}
            <PortalButton variant="outline">Update preferences</PortalButton>
          </Panel>

          <Panel className="space-y-3">
            <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
              Saved grant searches
            </h2>
            <p className="text-[13px] text-[#5B6577]">
              Premium subscribers receive automatic alerts when new matching
              opportunities are added.
            </p>
            {[
              { q: "UK · Grants · London SMEs", alerts: true },
              { q: "Learning · Python · Beginner", alerts: false },
            ].map((s) => (
              <div
                key={s.q}
                className="flex items-center justify-between rounded-[10px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 py-2.5"
              >
                <span className="text-[13px] font-semibold text-[#0B1B32]">
                  {s.q}
                </span>
                <span className="text-[11px] font-bold text-[#00AEEF]">
                  {s.alerts ? "Alerts on" : "Alerts off"}
                </span>
              </div>
            ))}
            <PortalButton className="w-full" variant="outline">
              Save current Resource Centre filters
            </PortalButton>
          </Panel>

          <Panel>
            <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
              Session
            </h2>
            <p className="mt-2 text-[13px] text-[#5B6577]">
              Signed in as <strong>{session?.email}</strong>. Logging out clears
              this device session and returns you to login.
            </p>
            <PortalButton className="mt-4 w-full" onClick={logout}>
              Log out of SellPlan
            </PortalButton>
          </Panel>
        </div>
      </div>
    </div>
  );
}
