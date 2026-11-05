import type { ResourceMenuId } from "@/lib/portal-data";
import { readSession } from "@/lib/auth";

export type SubmissionKind = "listing" | "resource" | "event";
export type SubmissionStatus = "draft" | "pending" | "approved" | "rejected";

type BaseSubmission = {
  id: string;
  kind: SubmissionKind;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  submittedBy: {
    username: string;
    email: string;
    name: string;
  };
};

export type ListingSubmission = BaseSubmission & {
  kind: "listing";
  title: string;
  listingType: string;
  category: string;
  location: string;
  price: string;
  visibility: string;
  description: string;
  image?: string;
};

export type ResourceSubmission = BaseSubmission & {
  kind: "resource";
  title: string;
  url: string;
  menu: Exclude<ResourceMenuId, "all">;
  why: string;
  region: "UK" | "USA" | "Europe" | "International";
};

export type EventSubmission = BaseSubmission & {
  kind: "event";
  title: string;
  date: string;
  eventType: "Webinar" | "Workshop" | "Networking";
  url: string;
  featuredBoost: boolean;
  host: string;
};

export type AnySubmission =
  | ListingSubmission
  | ResourceSubmission
  | EventSubmission;

export type LocalStore = {
  submissions: AnySubmission[];
};

const STORE_KEY = "sellplan_local_store_v1";

function emptyStore(): LocalStore {
  return { submissions: [] };
}

export function readLocalStore(): LocalStore {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as LocalStore;
    if (!Array.isArray(parsed.submissions)) return emptyStore();
    return parsed;
  } catch {
    return emptyStore();
  }
}

function writeLocalStore(store: LocalStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event("sellplan-store-updated"));
}

function actor() {
  const session = readSession();
  return {
    username: session?.username ?? "guest",
    email: session?.email ?? "guest@local",
    name: session?.name ?? "Guest",
  };
}

function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function addListingSubmission(
  input: Omit<
    ListingSubmission,
    "id" | "kind" | "createdAt" | "updatedAt" | "submittedBy" | "status"
  > & { status: "draft" | "pending" },
) {
  const now = new Date().toISOString();
  const item: ListingSubmission = {
    id: uid("listing"),
    kind: "listing",
    createdAt: now,
    updatedAt: now,
    submittedBy: actor(),
    image: "/assets/explorethemarketplace/popularcafe.png",
    ...input,
  };
  const store = readLocalStore();
  store.submissions.unshift(item);
  writeLocalStore(store);
  return item;
}

export function addResourceSubmission(
  input: Omit<
    ResourceSubmission,
    "id" | "kind" | "createdAt" | "updatedAt" | "submittedBy" | "status"
  >,
) {
  const now = new Date().toISOString();
  const item: ResourceSubmission = {
    id: uid("resource"),
    kind: "resource",
    status: "pending",
    createdAt: now,
    updatedAt: now,
    submittedBy: actor(),
    ...input,
  };
  const store = readLocalStore();
  store.submissions.unshift(item);
  writeLocalStore(store);
  return item;
}

export function addEventSubmission(
  input: Omit<
    EventSubmission,
    "id" | "kind" | "createdAt" | "updatedAt" | "submittedBy" | "status"
  >,
) {
  const now = new Date().toISOString();
  const item: EventSubmission = {
    id: uid("event"),
    kind: "event",
    status: "pending",
    createdAt: now,
    updatedAt: now,
    submittedBy: actor(),
    ...input,
  };
  const store = readLocalStore();
  store.submissions.unshift(item);
  writeLocalStore(store);
  return item;
}

export function setSubmissionStatus(
  id: string,
  status: SubmissionStatus,
) {
  const store = readLocalStore();
  const idx = store.submissions.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  const current = store.submissions[idx]!;
  const next = {
    ...current,
    status,
    updatedAt: new Date().toISOString(),
  } as AnySubmission;
  store.submissions[idx] = next;
  writeLocalStore(store);
  return next;
}

export function getPendingSubmissions() {
  return readLocalStore().submissions.filter((s) => s.status === "pending");
}

export function getMyListingSubmissions(username?: string) {
  const key = (username ?? readSession()?.username ?? "").toLowerCase();
  return readLocalStore().submissions.filter(
    (s): s is ListingSubmission =>
      s.kind === "listing" && s.submittedBy.username.toLowerCase() === key,
  );
}

export function getApprovedListings() {
  return readLocalStore().submissions.filter(
    (s): s is ListingSubmission =>
      s.kind === "listing" && s.status === "approved",
  );
}

export function getApprovedResources() {
  return readLocalStore().submissions.filter(
    (s): s is ResourceSubmission =>
      s.kind === "resource" && s.status === "approved",
  );
}

export function getApprovedEvents() {
  return readLocalStore().submissions.filter(
    (s): s is EventSubmission =>
      s.kind === "event" && s.status === "approved",
  );
}

export function getAllSubmissions() {
  return readLocalStore().submissions;
}

export function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
