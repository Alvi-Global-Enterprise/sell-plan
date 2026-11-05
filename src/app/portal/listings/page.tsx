"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { myListings } from "@/lib/portal-data";
import {
  formatWhen,
  getMyListingSubmissions,
  type ListingSubmission,
} from "@/lib/local-store";
import { PageHeader, PortalButton, StatusPill } from "@/components/portal/ui";

function statusLabel(status: ListingSubmission["status"]) {
  if (status === "pending") return "Pending";
  if (status === "approved") return "Live";
  if (status === "rejected") return "Rejected";
  return "Draft";
}

function ListingsInner() {
  const params = useSearchParams();
  const saved = params.get("saved");
  const [mine, setMine] = useState<ListingSubmission[]>([]);

  useEffect(() => {
    const refresh = () => setMine(getMyListingSubmissions());
    refresh();
    window.addEventListener("sellplan-store-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("sellplan-store-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Seller tools"
        title="My Listings"
        description="Create, edit and track your business advertisements and plans. New items are stored in this browser until backend exists."
        actions={
          <PortalButton href="/portal/listings/new">Create listing</PortalButton>
        }
      />

      {saved ? (
        <div className="rounded-[12px] border border-[#B7F0D8] bg-[#E8FBF3] px-4 py-3 text-[13px] font-medium text-[#0B9B6B]">
          {saved === "draft"
            ? "Draft saved locally."
            : "Listing submitted — check Admin → Approvals (same browser)."}{" "}
          <Link href="/portal/listings/new" className="font-bold underline">
            Create another
          </Link>
        </div>
      ) : null}

      {mine.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-[14px] font-extrabold text-[#0B1B32]">
            Your submissions (local)
          </h2>
          {mine.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#E3E8EF] bg-white px-4 py-3"
            >
              <div>
                <p className="text-[14px] font-bold text-[#0B1B32]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[12px] text-[#6B7280]">
                  {item.location} · {item.price} · {formatWhen(item.createdAt)}
                </p>
              </div>
              <StatusPill status={statusLabel(item.status)} />
            </div>
          ))}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[16px] border border-[#E3E8EF] bg-white">
        <div className="border-b border-[#E3E8EF] bg-[#F8FAFC] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B93A3]">
          Sample seed listings
        </div>
        {myListings.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 gap-3 border-b border-[#E3E8EF] px-4 py-4 last:border-b-0 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.5fr_0.5fr] md:items-center"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-20 overflow-hidden rounded-[8px]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0B1B32]">
                  {item.title}
                </p>
                <p className="text-[12px] text-[#6B7280]">{item.location}</p>
              </div>
            </div>
            <p className="text-[13px] font-medium text-[#5B6577]">{item.type}</p>
            <p className="text-[13px] font-extrabold text-[#0B1B32]">
              {item.price}
            </p>
            <StatusPill status={item.status} />
            <Link
              href={`/portal/marketplace/${item.id}`}
              className="text-[13px] font-bold text-[#00AEEF]"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-[14px] text-[#5B6577]">Loading listings…</div>
      }
    >
      <ListingsInner />
    </Suspense>
  );
}
