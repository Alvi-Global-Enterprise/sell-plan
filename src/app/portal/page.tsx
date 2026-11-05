import Link from "next/link";
import Image from "next/image";
import {
  dashboardStats,
  events,
  marketplaceListings,
  officePillars,
  resources,
} from "@/lib/portal-data";
import { PageHeader, Panel, PortalButton, StatCard } from "@/components/portal/ui";
import { ExternalIcon } from "@/components/portal/PortalIcons";

export default function PortalDashboardPage() {
  const featuredResources = resources.filter((r) => r.featured).slice(0, 4);
  const liveListings = marketplaceListings
    .filter((l) => l.status === "Live")
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Customer office"
        title="Your Business Resource Centre"
        description="Learn • Grow • Advertise • Network • Fund — libraries, grants, learning, webinars, advertising and networking in one place."
        actions={
          <>
            <PortalButton href="/portal/listings/new">List a business</PortalButton>
            <PortalButton href="/portal/resources" variant="outline">
              Open Resource Centre
            </PortalButton>
          </>
        }
      />

      <div className="flex flex-wrap gap-2">
        {officePillars.map((p) => (
          <Link
            key={p.label}
            href={`/portal/resources?menu=${p.menu}`}
            className="rounded-full border border-[#E3E8EF] bg-white px-3.5 py-2 text-[12px] font-semibold text-[#0B1B32] shadow-[0_6px_16px_-12px_rgba(11,27,54,0.2)] transition hover:border-[#00AEEF] hover:text-[#00AEEF]"
          >
            {p.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
              Marketplace snapshot
            </h2>
            <Link
              href="/portal/marketplace"
              className="text-[12px] font-bold text-[#00AEEF]"
            >
              View all →
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {liveListings.map((item) => (
              <Link
                key={item.id}
                href={`/portal/marketplace/${item.id}`}
                className="flex gap-3 rounded-[12px] border border-[#E3E8EF] p-3 transition hover:border-[#00AEEF]/40 hover:bg-[#F8FCFF]"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[8px]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-[#0B1B32]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#6B7280]">
                    {item.location} · {item.category}
                  </p>
                  <p className="mt-1 text-[13px] font-extrabold text-[#00AEEF]">
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel>
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
                Featured opportunities
              </h2>
              <Link
                href="/portal/resources"
                className="text-[12px] font-bold text-[#00AEEF]"
              >
                Directory →
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {featuredResources.map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-3 rounded-[12px] border border-[#E3E8EF] p-3 transition hover:border-[#00AEEF]/40"
                >
                  <div>
                    <p className="text-[13px] font-bold text-[#0B1B32]">
                      {r.title}
                    </p>
                    <p className="mt-1 text-[12px] text-[#6B7280]">
                      {r.description}
                    </p>
                  </div>
                  <ExternalIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#00AEEF]" />
                </a>
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
                Upcoming events
              </h2>
              <Link
                href="/portal/events"
                className="text-[12px] font-bold text-[#00AEEF]"
              >
                Calendar →
              </Link>
            </div>
            <ul className="mt-4 space-y-3">
              {events.slice(0, 3).map((e) => (
                <li
                  key={e.id}
                  className="rounded-[12px] border border-[#E3E8EF] px-3 py-2.5"
                >
                  <p className="text-[13px] font-bold text-[#0B1B32]">
                    {e.title}
                  </p>
                  <p className="mt-1 text-[12px] text-[#6B7280]">
                    {e.date} · {e.type}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
