"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { marketplaceListings, type Listing } from "@/lib/portal-data";
import { getApprovedListings } from "@/lib/local-store";
import { PageHeader, PortalButton, StatusPill } from "@/components/portal/ui";
import { SearchIcon } from "@/components/portal/PortalIcons";

const filters = ["All", "Business", "Plan", "Investment"] as const;

export default function MarketplacePage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof filters)[number]>("All");
  const [extra, setExtra] = useState<Listing[]>([]);

  useEffect(() => {
    const merge = () => {
      setExtra(
        getApprovedListings().map((l) => ({
          id: l.id,
          title: l.title,
          category: l.category,
          location: l.location,
          price: l.price,
          status: "Live" as const,
          type: (l.listingType.toLowerCase().includes("plan")
            ? "Plan"
            : l.listingType.toLowerCase().includes("invest")
              ? "Investment"
              : "Business") as Listing["type"],
          image: l.image ?? "/assets/explorethemarketplace/popularcafe.png",
        })),
      );
    };
    merge();
    window.addEventListener("sellplan-store-updated", merge);
    window.addEventListener("storage", merge);
    return () => {
      window.removeEventListener("sellplan-store-updated", merge);
      window.removeEventListener("storage", merge);
    };
  }, []);

  const catalog = useMemo(
    () => [...extra, ...marketplaceListings],
    [extra],
  );

  const items = useMemo(() => {
    return catalog.filter((item) => {
      const matchType = type === "All" || item.type === type;
      const matchQ =
        !q ||
        item.title.toLowerCase().includes(q.toLowerCase()) ||
        item.location.toLowerCase().includes(q.toLowerCase()) ||
        item.category.toLowerCase().includes(q.toLowerCase());
      return matchType && matchQ;
    });
  }, [q, type, catalog]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Marketplace"
        title="Explore opportunities"
        description="Browse businesses for sale, business plans and investment opportunities — including locally approved customer listings."
        actions={
          <PortalButton href="/portal/listings/new">
            List your business
          </PortalButton>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B93A3]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, location or category"
            className="h-11 w-full rounded-[10px] border border-[#E3E8EF] bg-white pl-10 pr-3 text-[14px] outline-none focus:border-[#00AEEF]"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setType(f)}
              className={`rounded-full border px-3.5 py-2 text-[12px] font-semibold transition ${
                type === f
                  ? "border-[#00AEEF] bg-[#00AEEF] text-white"
                  : "border-[#E3E8EF] bg-white text-[#0B1B32] hover:border-[#00AEEF]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/portal/marketplace/${item.id}`}
            className="overflow-hidden rounded-[16px] border border-[#E3E8EF] bg-white shadow-[0_8px_24px_-18px_rgba(11,27,54,0.2)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_-18px_rgba(11,27,54,0.28)]"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="400px"
              />
              <span className="absolute left-3 top-3 rounded-[6px] bg-[#00AEEF] px-2.5 py-1 text-[11px] font-bold text-white">
                {item.category}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-[15px] font-extrabold text-[#0B1B32]">
                  {item.title}
                </h2>
                <StatusPill status={item.status} />
              </div>
              <p className="mt-1 text-[12px] text-[#6B7280]">
                {item.location} · {item.type}
              </p>
              <p className="mt-3 text-[16px] font-extrabold text-[#00AEEF]">
                {item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
