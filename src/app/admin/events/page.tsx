"use client";

import { useEffect, useState } from "react";
import { events } from "@/lib/portal-data";
import {
  formatWhen,
  getAllSubmissions,
  setSubmissionStatus,
  type EventSubmission,
} from "@/lib/local-store";
import { PageHeader, Panel, PortalButton, StatusPill } from "@/components/portal/ui";

export default function AdminEventsPage() {
  const [localEvents, setLocalEvents] = useState<EventSubmission[]>([]);

  function refresh() {
    setLocalEvents(
      getAllSubmissions().filter(
        (s): s is EventSubmission => s.kind === "event",
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
        eyebrow="Calendar"
        title="Events queue"
        description="Customer webinar submissions (localStorage) plus seed academy events."
      />

      {localEvents.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-[14px] font-extrabold text-[#0B1B32]">
            Customer submissions
          </h2>
          {localEvents.map((e) => (
            <Panel key={e.id} className="!py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill status={e.eventType} />
                    <StatusPill
                      status={
                        e.status === "pending"
                          ? "Pending"
                          : e.status === "approved"
                            ? "Live"
                            : e.status
                      }
                    />
                    {e.featuredBoost ? <StatusPill status="Featured" /> : null}
                  </div>
                  <h2 className="mt-2 text-[15px] font-extrabold text-[#0B1B32]">
                    {e.title}
                  </h2>
                  <p className="mt-1 text-[12px] text-[#6B7280]">
                    {e.date} · {e.host} · {e.submittedBy.username} ·{" "}
                    {formatWhen(e.createdAt)}
                  </p>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[12px] font-bold text-[#00AEEF]"
                  >
                    {e.url}
                  </a>
                </div>
                {e.status === "pending" ? (
                  <div className="flex gap-2">
                    <PortalButton
                      className="h-9"
                      onClick={() => {
                        setSubmissionStatus(e.id, "approved");
                        refresh();
                      }}
                    >
                      Approve
                    </PortalButton>
                    <PortalButton
                      className="h-9"
                      variant="outline"
                      onClick={() => {
                        setSubmissionStatus(e.id, "rejected");
                        refresh();
                      }}
                    >
                      Reject
                    </PortalButton>
                  </div>
                ) : null}
              </div>
            </Panel>
          ))}
        </div>
      ) : (
        <Panel>
          <p className="text-[13px] text-[#5B6577]">
            No customer event submissions in localStorage yet.
          </p>
        </Panel>
      )}

      <div className="space-y-3">
        <h2 className="text-[14px] font-extrabold text-[#0B1B32]">
          Seed events
        </h2>
        {events.map((e) => (
          <Panel key={e.id} className="!py-4">
            <div className="flex flex-wrap gap-2">
              <StatusPill status={e.type} />
              {e.featured ? <StatusPill status="Featured" /> : null}
            </div>
            <h2 className="mt-2 text-[15px] font-extrabold text-[#0B1B32]">
              {e.title}
            </h2>
            <p className="mt-1 text-[12px] text-[#6B7280]">
              {e.date} · {e.host}
            </p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
