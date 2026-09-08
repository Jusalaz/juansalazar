import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client: bypasses Row Level Security entirely.
 * Only ever import this inside Server Actions / Route Handlers gated by
 * the /admin auth middleware — never in a Client Component.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
