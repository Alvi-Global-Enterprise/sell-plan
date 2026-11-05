import type { Metadata } from "next";
import AuthGuard from "@/components/portal/AuthGuard";
import AdminShell from "@/components/portal/AdminShell";

export const metadata: Metadata = {
  title: "SellPlan Admin — Staff portal",
  description:
    "Approve resources, events and sponsored placements for the SellPlan Resource Centre.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard role="admin">
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}
