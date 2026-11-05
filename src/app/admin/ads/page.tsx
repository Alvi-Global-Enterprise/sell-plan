import { resources, revenueAddOns } from "@/lib/portal-data";
import { PageHeader, Panel, PortalButton, StatusPill } from "@/components/portal/ui";

export default function AdminAdsPage() {
  const sponsored = resources.filter((r) => r.sponsored || r.featured);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Monetisation"
        title="Sponsored placements"
        description="Manage paid featured webinars, directory boosts and sponsored Resource Centre slots."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel>
          <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
            Active / featured slots
          </h2>
          <div className="mt-4 space-y-3">
            {sponsored.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 rounded-[12px] border border-[#E3E8EF] px-3 py-3"
              >
                <div>
                  <p className="text-[13px] font-bold text-[#0B1B32]">
                    {r.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#6B7280]">{r.region}</p>
                </div>
                <StatusPill status={r.sponsored ? "Sponsored" : "Featured"} />
              </div>
            ))}
          </div>
          <PortalButton className="mt-4" variant="outline">
            Create placement
          </PortalButton>
        </Panel>

        <Panel>
          <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
            Rate card
          </h2>
          <ul className="mt-4 space-y-2">
            {revenueAddOns.map((row) => (
              <li
                key={row.feature}
                className="flex items-center justify-between gap-3 rounded-[10px] border border-[#E3E8EF] px-3 py-2.5 text-[13px]"
              >
                <span className="font-medium text-[#0B1B32]">{row.feature}</span>
                <span className="font-bold text-[#00AEEF]">{row.charge}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
