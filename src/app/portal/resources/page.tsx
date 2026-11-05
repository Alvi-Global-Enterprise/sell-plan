"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  officePillars,
  resourceMenus,
  resources as seedResources,
  type LearningLevel,
  type Resource,
  type ResourceMenuId,
} from "@/lib/portal-data";
import {
  addResourceSubmission,
  getApprovedResources,
} from "@/lib/local-store";
import {
  Disclaimer,
  PageHeader,
  Panel,
  PortalButton,
} from "@/components/portal/ui";
import { ExternalIcon, SearchIcon } from "@/components/portal/PortalIcons";

const regions = ["All", "UK", "USA", "Europe", "International"] as const;
const levels: { id: LearningLevel | "all"; label: string }[] = [
  { id: "all", label: "All levels" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

const menuIds = new Set(resourceMenus.map((m) => m.id));

export default function ResourcesPage() {
  return (
    <Suspense fallback={<div className="text-[14px] text-[#5B6577]">Loading Resource Centre…</div>}>
      <ResourcesInner />
    </Suspense>
  );
}

function ResourcesInner() {
  const searchParams = useSearchParams();
  const initialMenu = searchParams.get("menu");
  const [menu, setMenu] = useState<ResourceMenuId>(
    initialMenu && menuIds.has(initialMenu as ResourceMenuId)
      ? (initialMenu as ResourceMenuId)
      : "all",
  );
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [level, setLevel] = useState<(typeof levels)[number]["id"]>("all");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Resource[]>(seedResources);
  const [submitted, setSubmitted] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    const merge = () => {
      const approved = getApprovedResources().map(
        (r): Resource => ({
          id: r.id,
          title: r.title,
          description: r.why || "Community-submitted opportunity.",
          menu: r.menu,
          url: r.url,
          region: r.region,
          featured: false,
        }),
      );
      const ids = new Set(approved.map((a) => a.id));
      setItems([
        ...approved,
        ...seedResources.filter((s) => !ids.has(s.id)),
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

  const filtered = useMemo(() => {
    return items.filter((r) => {
      const matchMenu = menu === "all" || r.menu === menu;
      const matchRegion = region === "All" || r.region === region;
      const matchLevel =
        level === "all" || !r.level || r.level === level;
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.description.toLowerCase().includes(q.toLowerCase());
      return matchMenu && matchRegion && matchLevel && matchQ;
    });
  }, [items, menu, region, level, q]);

  const showLevelFilter =
    menu === "all" ||
    menu === "courses" ||
    menu === "python" ||
    menu === "ai-learning";

  function toggleBookmark(id: string) {
    setItems((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, bookmarked: !r.bookmarked } : r,
      ),
    );
  }

  function onSuggest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    addResourceSubmission({
      title: String(data.get("title") ?? ""),
      url: String(data.get("url") ?? ""),
      menu: String(data.get("menu") ?? "library") as Exclude<
        ResourceMenuId,
        "all"
      >,
      why: String(data.get("why") ?? ""),
      region: "UK",
    });
    setSubmitted(true);
    setShowSubmit(false);
    e.currentTarget.reset();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Resource Centre"
        title="Your Business Resource Centre"
        description="Learn • Grow • Advertise • Network • Fund — searchable directory of external opportunities."
        actions={
          <>
            {showSubmit ? (
              <PortalButton
                variant="outline"
                onClick={() => setShowSubmit(false)}
              >
                Cancel form
              </PortalButton>
            ) : (
              <PortalButton
                variant="outline"
                onClick={() => setShowSubmit(true)}
              >
                Submit an opportunity
              </PortalButton>
            )}
            <PortalButton href="/portal/events">Submit a webinar</PortalButton>
          </>
        }
      />

      <Disclaimer />

      {submitted ? (
        <div className="rounded-[12px] border border-[#B7F0D8] bg-[#E8FBF3] px-4 py-3 text-[13px] font-medium text-[#0B9B6B]">
          Saved to localStorage and queued for admin approval. Open Admin →
          Approvals in this same browser to review it.
        </div>
      ) : null}

      {showSubmit ? (
        <Panel>
          <h2 className="text-[16px] font-extrabold text-[#0B1B32]">
            Suggest a useful website, grant or training link
          </h2>
          <p className="mt-1 text-[13px] text-[#5B6577]">
            Staff approve external links before publication.
          </p>
          <form
            onSubmit={onSuggest}
            className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <label className="block md:col-span-2">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Title
              </span>
              <input
                required
                name="title"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                URL
              </span>
              <input
                required
                name="url"
                type="url"
                placeholder="https://"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Category
              </span>
              <select
                name="menu"
                className="mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-white px-3 text-[14px] outline-none focus:border-[#00AEEF]"
              >
                {resourceMenus
                  .filter((m) => m.id !== "all")
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Why is this useful?
              </span>
              <textarea
                name="why"
                rows={3}
                className="mt-1.5 w-full rounded-[8px] border border-[#E3E8EF] px-3 py-2 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <div className="md:col-span-2 flex flex-wrap gap-2">
              <PortalButton type="submit">Send for admin review</PortalButton>
              <PortalButton
                type="button"
                variant="ghost"
                onClick={() => setShowSubmit(false)}
              >
                Cancel & go back
              </PortalButton>
            </div>
          </form>
        </Panel>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {officePillars.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setMenu(p.menu)}
            className={`rounded-full border px-3.5 py-2 text-[12px] font-semibold transition ${
              menu === p.menu
                ? "border-[#0B1B32] bg-[#0B1B32] text-white"
                : "border-[#E3E8EF] bg-white text-[#0B1B32] hover:border-[#00AEEF]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-[16px] border border-[#E3E8EF] bg-white p-3 shadow-[0_8px_24px_-18px_rgba(11,27,54,0.16)]">
          <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8B93A3]">
            Submenus
          </p>
          <nav className="flex flex-col gap-1">
            {resourceMenus.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMenu(m.id)}
                className={`rounded-[10px] px-3 py-2.5 text-left transition ${
                  menu === m.id
                    ? "bg-[#E6F7FE] text-[#00AEEF]"
                    : "text-[#0B1B32] hover:bg-[#F5F7FA]"
                }`}
              >
                <span className="block text-[13px] font-bold">{m.label}</span>
                <span className="mt-0.5 block text-[11px] text-[#8B93A3]">
                  {m.hint}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B93A3]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search grants, libraries, courses, ads…"
                className="h-11 w-full rounded-[10px] border border-[#E3E8EF] bg-white pl-10 pr-3 text-[14px] outline-none focus:border-[#00AEEF]"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`rounded-full border px-3 py-2 text-[12px] font-semibold ${
                    region === r
                      ? "border-[#0B1B32] bg-[#0B1B32] text-white"
                      : "border-[#E3E8EF] bg-white text-[#5B6577]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {showLevelFilter ? (
            <div className="flex flex-wrap gap-2">
              {levels.map((l) => (
                <button
                  key={String(l.id)}
                  type="button"
                  onClick={() => setLevel(l.id)}
                  className={`rounded-full border px-3 py-1.5 text-[12px] font-semibold ${
                    level === l.id
                      ? "border-[#00AEEF] bg-[#00AEEF] text-white"
                      : "border-[#E3E8EF] bg-white text-[#5B6577]"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          ) : null}

          <p className="text-[12px] font-semibold text-[#8B93A3]">
            {filtered.length} opportunities · external sites open in a new tab
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((r) => (
              <article
                key={r.id}
                className="flex flex-col rounded-[16px] border border-[#E3E8EF] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(11,27,54,0.18)] transition hover:border-[#00AEEF]/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00AEEF]">
                      {resourceMenus.find((m) => m.id === r.menu)?.label}
                      {r.featured ? " · Featured" : ""}
                      {r.sponsored ? " · Sponsored" : ""}
                    </p>
                    <h2 className="mt-2 text-[16px] font-extrabold text-[#0B1B32]">
                      {r.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(r.id)}
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                      r.bookmarked
                        ? "border-[#00AEEF] bg-[#E6F7FE] text-[#00AEEF]"
                        : "border-[#E3E8EF] text-[#5B6577]"
                    }`}
                    aria-label="Bookmark"
                  >
                    {r.bookmarked ? "Saved" : "Save"}
                  </button>
                </div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#5B6577]">
                  {r.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#F5F7FA] px-2.5 py-1 text-[11px] font-semibold text-[#5B6577]">
                      {r.region}
                    </span>
                    {r.level ? (
                      <span className="rounded-full bg-[#F5F7FA] px-2.5 py-1 text-[11px] font-semibold capitalize text-[#5B6577]">
                        {r.level}
                      </span>
                    ) : null}
                  </div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#00AEEF]"
                  >
                    Visit <ExternalIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
