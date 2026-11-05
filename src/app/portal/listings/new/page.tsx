"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addListingSubmission } from "@/lib/local-store";
import { PageHeader, Panel, PortalButton } from "@/components/portal/ui";

const listingTypes = [
  "Business for sale",
  "Business plan",
  "Investment opportunity",
  "Franchise",
] as const;

const categories = [
  "Hospitality",
  "Retail",
  "E-commerce",
  "Fitness",
  "Construction",
  "Professional services",
  "Technology / SaaS",
  "Healthcare",
  "Education & training",
  "Manufacturing",
  "Transport & logistics",
  "Property & real estate",
  "Food & beverage",
  "Beauty & wellness",
  "Creative & media",
  "Other",
] as const;

const visibilityOptions = ["Public", "Members only", "Private draft"] as const;

const fieldClass =
  "mt-1.5 h-11 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 text-[14px] outline-none focus:border-[#00AEEF]";

export default function NewListingPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  function readForm(form: HTMLFormElement) {
    const data = new FormData(form);
    return {
      listingType: String(data.get("listingType") ?? ""),
      category: String(data.get("category") ?? ""),
      title: String(data.get("title") ?? ""),
      location: String(data.get("location") ?? ""),
      price: String(data.get("price") ?? ""),
      visibility: String(data.get("visibility") ?? ""),
      description: String(data.get("description") ?? ""),
    };
  }

  function onSave(e: FormEvent<HTMLFormElement>, mode: "draft" | "pending") {
    e.preventDefault();
    setSaving(true);
    const payload = readForm(e.currentTarget);
    addListingSubmission({ ...payload, status: mode });
    router.push(
      mode === "draft"
        ? "/portal/listings?saved=draft"
        : "/portal/listings?saved=review",
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        backHref="/portal/listings"
        backLabel="Back to My Listings"
        eyebrow="Create"
        title="List your business"
        description="Saved locally for now — submit for review and it appears in the admin approvals inbox."
        actions={
          <PortalButton href="/portal/listings" variant="outline">
            Cancel
          </PortalButton>
        }
      />

      <Panel>
        <form className="space-y-5" onSubmit={(e) => onSave(e, "pending")}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Listing type
              </span>
              <select name="listingType" required className={fieldClass}>
                {listingTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Category
              </span>
              <select name="category" required className={fieldClass}>
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Title
              </span>
              <input
                name="title"
                required
                placeholder="e.g. Popular Café and Coffee Shop"
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Location
              </span>
              <input
                name="location"
                required
                placeholder="e.g. London, UK"
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Asking price
              </span>
              <input
                name="price"
                required
                placeholder="e.g. £185,000"
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className="text-[12px] font-semibold text-[#0B1B32]">
                Visibility
              </span>
              <select name="visibility" required className={fieldClass}>
                {visibilityOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-[12px] font-semibold text-[#0B1B32]">
              Description
            </span>
            <textarea
              name="description"
              rows={5}
              defaultValue="Established café in a prime location with loyal customer base and growth potential."
              className="mt-1.5 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 py-2.5 text-[14px] outline-none focus:border-[#00AEEF]"
            />
          </label>
          <div className="flex flex-wrap gap-2 border-t border-[#E3E8EF] pt-5">
            <PortalButton type="submit" className={saving ? "opacity-70" : ""}>
              {saving ? "Saving…" : "Submit for review"}
            </PortalButton>
            <PortalButton
              type="button"
              variant="outline"
              onClick={(e) => {
                const form = (e.currentTarget as HTMLElement).closest("form");
                if (!form) return;
                setSaving(true);
                addListingSubmission({
                  ...readForm(form as HTMLFormElement),
                  status: "draft",
                });
                router.push("/portal/listings?saved=draft");
              }}
            >
              Save draft
            </PortalButton>
            <PortalButton href="/portal/listings" variant="ghost">
              Cancel & go back
            </PortalButton>
          </div>
        </form>
      </Panel>
    </div>
  );
}
