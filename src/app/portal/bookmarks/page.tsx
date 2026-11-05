import Link from "next/link";
import { resources } from "@/lib/portal-data";
import { PageHeader, Panel, PortalButton } from "@/components/portal/ui";
import { ExternalIcon } from "@/components/portal/PortalIcons";

export default function BookmarksPage() {
  const saved = resources.filter((r) => r.bookmarked);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Personal"
        title="Bookmarks"
        description="Saved resources from your Resource Centre — your personal quick-access list."
        actions={
          <PortalButton href="/portal/resources" variant="outline">
            Browse directory
          </PortalButton>
        }
      />

      {saved.length === 0 ? (
        <Panel>
          <p className="text-[14px] text-[#5B6577]">
            No bookmarks yet. Open the Resource Centre and tap Save on any
            opportunity.
          </p>
          <PortalButton href="/portal/resources" className="mt-4">
            Find opportunities
          </PortalButton>
        </Panel>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {saved.map((r) => (
            <Panel key={r.id} className="!p-4">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between gap-3"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00AEEF]">
                    {r.menu}
                  </p>
                  <h2 className="mt-1 text-[15px] font-extrabold text-[#0B1B32]">
                    {r.title}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#5B6577]">
                    {r.description}
                  </p>
                </div>
                <ExternalIcon className="h-4 w-4 shrink-0 text-[#00AEEF]" />
              </a>
            </Panel>
          ))}
        </div>
      )}

      <p className="text-[12px] text-[#8B93A3]">
        Tip: grant alert preferences live in{" "}
        <Link href="/portal/account" className="font-bold text-[#00AEEF]">
          Account → Notifications
        </Link>
        .
      </p>
    </div>
  );
}
