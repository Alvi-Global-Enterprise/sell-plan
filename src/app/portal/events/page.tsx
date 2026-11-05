"use client";

import { useEffect, useState, type FormEvent } from "react";
import { events as seedEvents } from "@/lib/portal-data";
import {
  addEventSubmission,
  getApprovedEvents,
  type EventSubmission,
} from "@/lib/local-store";
import {
  Disclaimer,
  PageHeader,
  Panel,
  PortalButton,
} from "@/components/portal/ui";

type ViewEvent = {
  id: string;
  title: string;
  date: string;
  type: string;
  host: string;
  featured?: boolean;
  priceNote?: string;
  url?: string;
  local?: boolean;
};

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [featuredBoost, setFeaturedBoost] = useState(false);
  const [list, setList] = useState<ViewEvent[]>(
    seedEvents.map((e) => ({ ...e })),
  );

  useEffect(() => {
    const merge = () => {
      const approved: ViewEvent[] = getApprovedEvents().map(
        (e: EventSubmission) => ({
          id: e.id,
          title: e.title,
          date: e.date,
          type: e.eventType,
          host: e.host,
          featured: e.featuredBoost,
          priceNote: e.featuredBoost ? "Featured · £5–£10" : undefined,
          url: e.url,
          local: true,
        }),
      );
      setList([
        ...approved,
        ...seedEvents.map((e) => ({ ...e, local: false as const })),
      ]);
    };
    merge();
    window.addEventListener("sellplan-store-updated", merge);
    window.addEventListener("storage", merge);
    return () => {
      window.removeEventListener("sellplan-store-updated", merge);
      window.removeEventListener("storage", merge);
    };
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    addEventSubmission({
      title: String(data.get("title") ?? ""),
      date: String(data.get("date") ?? ""),
      eventType: String(data.get("type") ?? "Webinar") as
        | "Webinar"
        | "Workshop"
        | "Networking",
      url: String(data.get("url") ?? ""),
      featuredBoost,
      host: "Customer submission",
    });
    setSent(true);
    setShowForm(false);
    e.currentTarget.reset();
    setFeaturedBoost(false);
  }

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const eventDays = new Map(
    seedEvents.filter((e) => e.month === "Nov").map((e) => [e.day, e]),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Webinars & Events"
        title="Event calendar"
        description="Attend SellPlan webinars, training and networking — or advertise your own event."
        actions={
          showForm ? (
            <PortalButton variant="outline" onClick={() => setShowForm(false)}>
              Cancel form
            </PortalButton>
          ) : (
            <PortalButton onClick={() => setShowForm(true)}>
              Submit an event
            </PortalButton>
          )
        }
      />

      <Disclaimer />

      {sent ? (
        <div className="rounded-[12px] border border-[#B7F0D8] bg-[#E8FBF3] px-4 py-3 text-[13px] font-medium text-[#0B9B6B]">
          Event saved locally and queued for admin approval. Open Admin →
          Approvals in this same browser to review it.
        </div>
      ) : null}

      {showForm ? (
        <Panel>
          <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
            Webinar / event submission
          </h2>
          <p className="mt-1 text-[13px] text-[#5B6577]">
            Basic listing free · Featured webinar £5–£10 after approval.
          </p>
          <form
            onSubmit={onSubmit}
            className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <label className="block md:col-span-2">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Event title
              </span>
              <input
                required
                name="title"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Date
              </span>
              <input
                required
                type="date"
                name="date"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Type
              </span>
              <select
                name="type"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-white px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              >
                <option>Webinar</option>
                <option>Workshop</option>
                <option>Networking</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                External link (Eventbrite / Zoom / Meetup)
              </span>
              <input
                required
                type="url"
                name="url"
                placeholder="https://"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <label className="flex items-center gap-3 md:col-span-2 rounded-[10px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 py-3 text-[13px] font-medium text-[#0B1B32]">
              <input
                type="checkbox"
                checked={featuredBoost}
                onChange={(ev) => setFeaturedBoost(ev.target.checked)}
              />
              Request featured placement (£5–£10)
            </label>
            <div className="md:col-span-2 flex flex-wrap gap-2">
              <PortalButton type="submit">Send for admin review</PortalButton>
              <PortalButton
                type="button"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel & go back
              </PortalButton>
            </div>
          </form>
        </Panel>
      ) : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {list.map((e) => (
            <div
              key={e.id}
              className="rounded-[16px] border border-[#E3E8EF] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(11,27,54,0.16)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#E6F7FE] px-2.5 py-1 text-[11px] font-bold text-[#00AEEF]">
                  {e.type}
                </span>
                {e.local ? (
                  <span className="rounded-full bg-[#E8FBF3] px-2.5 py-1 text-[11px] font-bold text-[#0B9B6B]">
                    Approved local
                  </span>
                ) : null}
                {e.featured ? (
                  <span className="rounded-full bg-[#FFF6E5] px-2.5 py-1 text-[11px] font-bold text-[#C47F00]">
                    {e.priceNote ?? "Featured"}
                  </span>
                ) : (
                  <span className="rounded-full bg-[#F5F7FA] px-2.5 py-1 text-[11px] font-bold text-[#6B7280]">
                    Free basic listing
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-[17px] font-extrabold text-[#0B1B32]">
                {e.title}
              </h2>
              <p className="mt-1 text-[13px] text-[#6B7280]">
                {e.date} · Hosted by {e.host}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.url ? (
                  <PortalButton href={e.url} className="h-9">
                    Open link
                  </PortalButton>
                ) : (
                  <PortalButton className="h-9">Register interest</PortalButton>
                )}
                <PortalButton variant="outline" className="h-9">
                  Add to calendar
                </PortalButton>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <Panel>
            <h3 className="text-[16px] font-extrabold text-[#0B1B32]">
              November calendar
            </h3>
            <p className="mt-1 text-[12px] text-[#6B7280]">
              Highlighted days have upcoming webinars or networking.
            </p>
            <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-[#8B93A3]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1.5">
              {calendarDays.map((day) => {
                const hit = eventDays.get(day);
                return (
                  <div
                    key={day}
                    title={hit?.title}
                    className={`flex h-9 items-center justify-center rounded-[8px] text-[12px] font-semibold ${
                      hit
                        ? "bg-[#00AEEF] text-white"
                        : "bg-[#F5F7FA] text-[#5B6577]"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel>
            <h3 className="text-[16px] font-extrabold text-[#0B1B32]">
              Promote your webinar
            </h3>
            <ul className="mt-3 space-y-2 text-[13px] text-[#0B1B32]">
              {[
                "Submit title, date and external link",
                "Saved to localStorage for admin review",
                "Optional featured boost £5–£10",
                "Appears live after admin approval",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-[10px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 py-2"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
