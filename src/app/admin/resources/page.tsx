"use client";

import { useEffect, useState } from "react";
import { menuLabel, resources } from "@/lib/portal-data";
import {
  formatWhen,
  getAllSubmissions,
  setSubmissionStatus,
  type ResourceSubmission,
} from "@/lib/local-store";
import { PageHeader, Panel, PortalButton, StatusPill } from "@/components/portal/ui";

export default function AdminResourcesPage() {
  const [localResources, setLocalResources] = useState<ResourceSubmission[]>(
    [],
  );

  function refresh() {
    setLocalResources(
      getAllSubmissions().filter(
        (s): s is ResourceSubmission => s.kind === "resource",
      ),
    );
  }

  useEffect(() => {
    refresh();
    window.addEventListener("sellplan-store-updated", refresh);
    return () => window.removeEventListener("sellplan-store-updated", refresh);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catalogue"
        title="Resource catalogue"
        description="Seed directory plus customer suggestions saved in localStorage."
      />

      {localResources.length > 0 ? (
        <Panel className="!p-0 overflow-hidden">
          <div className="border-b border-[#E3E8EF] bg-[#F8FAFC] px-4 py-3 text-[12px] font-bold text-[#0B1B32]">
            Customer suggestions
          </div>
          <div className="divide-y divide-[#E3E8EF]">
            {localResources.map((r) => (
              <div
                key={r.id}
                className="flex flex-wrap items-start justify-between gap-3 px-4 py-3"
              >
                <div>
                  <p className="text-[13px] font-bold text-[#0B1B32]">
                    {r.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#6B7280]">
                    {menuLabel(r.menu)} · {r.region} · @{r.submittedBy.username}{" "}
                    · {formatWhen(r.createdAt)}
                  </p>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold text-[#00AEEF]"
                  >
                    {r.url}
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill
                    status={
                      r.status === "pending"
                        ? "Pending"
                        : r.status === "approved"
                          ? "Live"
                          : r.status
                    }
                  />
                  {r.status === "pending" ? (
                    <>
                      <PortalButton
                        className="h-9"
                        onClick={() => {
                          setSubmissionStatus(r.id, "approved");
                          refresh();
                        }}
                      >
                        Approve
                      </PortalButton>
                      <PortalButton
                        className="h-9"
                        variant="outline"
                        onClick={() => {
                          setSubmissionStatus(r.id, "rejected");
                          refresh();
                        }}
                      >
                        Reject
                      </PortalButton>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}

      <Panel className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead className="bg-[#F5F7FA] text-[11px] uppercase tracking-[0.14em] text-[#8B93A3]">
              <tr>
                <th className="px-4 py-3 font-bold">Title</th>
                <th className="px-4 py-3 font-bold">Menu</th>
                <th className="px-4 py-3 font-bold">Region</th>
                <th className="px-4 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r.id} className="border-t border-[#E3E8EF]">
                  <td className="px-4 py-3 font-semibold text-[#0B1B32]">
                    {r.title}
                  </td>
                  <td className="px-4 py-3 text-[#5B6577]">
                    {menuLabel(r.menu)}
                  </td>
                  <td className="px-4 py-3 text-[#5B6577]">{r.region}</td>
                  <td className="px-4 py-3">
                    <StatusPill
                      status={
                        r.sponsored
                          ? "Sponsored"
                          : r.featured
                            ? "Featured"
                            : "Live"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
