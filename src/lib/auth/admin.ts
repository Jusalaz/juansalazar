import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Existing owner account, verified in Supabase Auth. This ID is not a credential.
export const OWNER_ID = "7229b197-8133-4f2d-994c-b4858a23e533";

export async function requireOwner(destination = "/adminsalazar") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/admin/login?next=${encodeURIComponent(destination)}`);
  if (user.id !== OWNER_ID) redirect("/admin/login?denied=1");
  return user;
}
