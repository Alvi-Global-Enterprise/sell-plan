"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { marketplaceListings, type Listing } from "@/lib/portal-data";
import { getApprovedListings, readLocalStore } from "@/lib/local-store";
import { PortalButton, StatusPill } from "@/components/portal/ui";

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [item, setItem] = useState<Listing | null>(null);
  const [description, setDescription] = useState(
    "This opportunity is listed on SellPlan. Contact the owner through the portal once messaging is connected.",
  );

  useEffect(() => {
    const seed = marketplaceListings.find((l) => l.id === id);
    if (seed) {
      setItem(seed);
      return;
    }
    const local =
      getApprovedListings().find((l) => l.id === id) ??
      readLocalStore().submissions.find(
        (s) => s.kind === "listing" && s.id === id,
      );
    if (local && local.kind === "listing") {
      setItem({
        id: local.id,
        title: local.title,
        category: local.category,
        location: local.location,
        price: local.price,
        status:
          local.status === "approved"
            ? "Live"
            : local.status === "pending"
              ? "Pending"
              : "Draft",
        type: local.listingType.toLowerCase().includes("plan")
          ? "Plan"
          : local.listingType.toLowerCase().includes("invest")
            ? "Investment"
            : "Business",
        image: local.image ?? "/assets/explorethemarketplace/popularcafe.png",
      });
      setDescription(local.description);
    }
  }, [id]);

  if (!item) {
    return (
      <div className="space-y-4">
        <Link
          href="/portal/marketplace"
          className="text-[13px] font-bold text-[#00AEEF]"
        >
          ← Back to marketplace
        </Link>
        <p className="text-[14px] text-[#5B6577]">Listing not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/portal/marketplace"
        className="text-[13px] font-bold text-[#00AEEF]"
      >
        ← Back to marketplace
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="overflow-hidden rounded-[18px] border border-[#E3E8EF] bg-white">
          <div className="relative aspect-[16/9]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="800px"
            />
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[6px] bg-[#E6F7FE] px-2.5 py-1 text-[11px] font-bold text-[#00AEEF]">
                {item.category}
              </span>
              <StatusPill status={item.status} />
              <span className="text-[12px] font-semibold text-[#6B7280]">
                {item.type}
              </span>
            </div>
            <h1 className="mt-3 font-display text-[28px] font-extrabold text-[#0B1B32]">
              {item.title}
            </h1>
            <p className="mt-2 text-[14px] text-[#5B6577]">{item.location}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5B6577]">
              {description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[16px] border border-[#E3E8EF] bg-white p-5 shadow-[0_8px_24px_-18px_rgba(11,27,54,0.18)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8B93A3]">
              Asking
            </p>
            <p className="mt-2 font-display text-[32px] font-extrabold text-[#00AEEF]">
              {item.price}
            </p>
            <PortalButton className="mt-5 w-full">Enquire now</PortalButton>
            <PortalButton
              href="/portal/bookmarks"
              variant="outline"
              className="mt-2 w-full"
            >
              Save to bookmarks
            </PortalButton>
          </div>
        </div>
      </div>
    </div>
  );
}
