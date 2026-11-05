"use client";

import { useEffect, useState } from "react";
import { events, resources } from "@/lib/portal-data";
import {
  formatWhen,
  getApprovedEvents,
  getApprovedListings,
  getApprovedResources,
  getPendingSubmissions,
  setSubmissionStatus,
  type AnySubmission,
} from "@/lib/local-store";
import { PageHeader, Panel, PortalButton, StatusPill } from "@/components/portal/ui";

function noteFor(item: AnySubmission) {
  if (item.kind === "listing") {
    return `${item.location} · ${item.price} · ${item.category}`;
  }
  if (item.kind === "resource") {
    return `${item.url} · ${item.menu}`;
  }
  return `${item.date} · ${item.eventType}${
    item.featuredBoost ? " · Featured boost" : ""
  }`;
}

export default function AdminApprovalsPage() {
  const [pending, setPending] = useState<AnySubmission[]>([]);
  const [liveCounts, setLiveCounts] = useState({
    resources: resources.length,
    events: events.length,
    listings: 0,
  });

  function refresh() {
    setPending(getPendingSubmissions());
    setLiveCounts({
      resources: resources.length + getApprovedResources().length,
      events: events.length + getApprovedEvents().length,
      listings: getApprovedListings().length,
    });
  }

  useEffect(() => {
    refresh();
    window.addEventListener("sellplan-store-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sellplan-store-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  function decide(id: string, status: "approved" | "rejected") {
    setSubmissionStatus(id, status);
    refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Staff portal"
        title="Approvals inbox"
        description="Customer submissions from this browser’s localStorage. Approve to publish into the customer portal catalogues."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Pending items", value: String(pending.length) },
          { label: "Live resources", value: String(liveCounts.resources) },
          { label: "Live events", value: String(liveCounts.events) },
          { label: "Approved listings", value: String(liveCounts.listings) },
        ].map((s) => (
          <Panel key={s.label} className="!py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B93A3]">
              {s.label}
            </p>
            <p className="mt-2 font-display text-[28px] font-extrabold text-[#0B1B32]">
              {s.value}
            </p>
          </Panel>
        ))}
      </div>

      <Panel>
        <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
          Pending reviews
        </h2>
        {pending.length === 0 ? (
          <p className="mt-4 rounded-[12px] border border-dashed border-[#D5DCE6] bg-[#F8FAFC] px-4 py-6 text-[13px] text-[#5B6577]">
            No pending submissions yet. Log in as a customer in this same
            browser, create a listing / resource / event, then refresh here.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {pending.map((p) => (
              <div
                key={p.id}
                className="rounded-[12px] border border-[#E3E8EF] p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-bold text-[#0B1B32]">
                    {p.title}
                  </p>
                  <StatusPill status="Pending" />
                </div>
                <p className="mt-1 text-[12px] capitalize text-[#6B7280]">
                  {p.kind} · {noteFor(p)}
                </p>
                <p className="mt-1 text-[11px] text-[#8B93A3]">
                  From {p.submittedBy.name} (@{p.submittedBy.username} ·{" "}
                  {p.submittedBy.email}) · {formatWhen(p.createdAt)}
                </p>
                <div className="mt-3 flex gap-2">
                  <PortalButton
                    className="h-9"
                    onClick={() => decide(p.id, "approved")}
                  >
                    Approve
                  </PortalButton>
                  <PortalButton
                    variant="outline"
                    className="h-9"
                    onClick={() => decide(p.id, "rejected")}
                  >
                    Reject
                  </PortalButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
