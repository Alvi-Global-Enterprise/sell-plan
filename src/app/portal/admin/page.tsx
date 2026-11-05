import { redirect } from "next/navigation";

/** Admin lives in a separate staff portal at /admin */
export default function PortalAdminRedirect() {
  redirect("/admin");
}
