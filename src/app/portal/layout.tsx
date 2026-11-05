import type { Metadata } from "next";
import AuthGuard from "@/components/portal/AuthGuard";
import PortalShell from "@/components/portal/PortalShell";

export const metadata: Metadata = {
  title: "SellPlan Portal — Your Business Office",
  description:
    "Manage listings, explore resources, run AI tools and grow your business inside SellPlan.",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard role="customer">
      <PortalShell>{children}</PortalShell>
    </AuthGuard>
  );
}
