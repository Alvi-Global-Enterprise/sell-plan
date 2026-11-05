import { revenueAddOns } from "@/lib/portal-data";
import { Disclaimer, PageHeader, Panel, PortalButton } from "@/components/portal/ui";

const plans = [
  {
    name: "Starter",
    price: "£19.99",
    note: "/month",
    current: true,
    features: [
      "Resource Centre directory (included)",
      "One active listing",
      "Basic profile & portal",
      "Submit free basic events",
      "Personal bookmarks",
    ],
  },
  {
    name: "Professional",
    price: "Soon",
    note: "",
    current: false,
    features: [
      "Saved grant searches & alerts",
      "Enhanced promotional listings",
      "Advanced AI tools",
      "More marketplace visibility",
      "Priority support",
    ],
  },
  {
    name: "Investor",
    price: "Soon",
    note: "",
    current: false,
    features: [
      "Premium opportunity alerts",
      "Investment opportunities",
      "Exclusive webinars",
      "Direct owner contact",
      "Priority filters",
    ],
  },
];

export default function MembershipPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title="Membership & promotions"
        description="Resource Centre is a standard SellPlan benefit. Premium subscribers get saved searches, alerts and enhanced promotional listings."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <Panel
            key={p.name}
            className={
              p.current
                ? "border-2 border-[#00AEEF] shadow-[0_12px_32px_-16px_rgba(0,174,239,0.35)]"
                : ""
            }
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-extrabold uppercase tracking-[0.14em] text-[#00AEEF]">
                {p.name}
              </h2>
              {p.current ? (
                <span className="rounded-full bg-[#00C38B] px-2.5 py-1 text-[10px] font-bold text-white">
                  Current
                </span>
              ) : (
                <span className="rounded-full bg-[#E6F7FE] px-2.5 py-1 text-[10px] font-bold text-[#00AEEF]">
                  Waitlist
                </span>
              )}
            </div>
            <p className="mt-4 font-display text-[32px] font-extrabold text-[#0B1B32]">
              {p.price}
              <span className="ml-1 text-[13px] font-semibold text-[#6B7280]">
                {p.note}
              </span>
            </p>
            <ul className="mt-4 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="text-[13px] text-[#5B6577]">
                  • {f}
                </li>
              ))}
            </ul>
            <PortalButton
              className="mt-5 w-full"
              variant={p.current ? "outline" : "solid"}
            >
              {p.current ? "Manage billing" : "Join waitlist"}
            </PortalButton>
          </Panel>
        ))}
      </div>

      <Panel>
        <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
          Resource Centre revenue add-ons
        </h2>
        <p className="mt-1 text-[13px] text-[#5B6577]">
          Suggested SellPlan prices — not third-party website charges.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#E3E8EF] text-[11px] uppercase tracking-[0.14em] text-[#8B93A3]">
                <th className="pb-2 font-bold">Feature</th>
                <th className="pb-2 font-bold">Proposed charge</th>
              </tr>
            </thead>
            <tbody>
              {revenueAddOns.map((row) => (
                <tr key={row.feature} className="border-b border-[#F0F3F7]">
                  <td className="py-3 font-medium text-[#0B1B32]">
                    {row.feature}
                  </td>
                  <td className="py-3 text-[#5B6577]">{row.charge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Disclaimer />
    </div>
  );
}
