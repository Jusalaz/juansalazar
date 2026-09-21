import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/actions";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const links = [
  { href: "/adminsalazar", label: "Métricas" },
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/libros", label: "Libros" },
  { href: "/admin/recursos", label: "Recursos" },
  { href: "/admin/prompts", label: "Prompts" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface-alt">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/admin" className="font-display text-lg text-ink">
              Admin
            </Link>
            <nav className="flex flex-wrap gap-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted">{user.email}</span>
            <Link href="/" className="text-xs font-medium text-accent-dark hover:text-ink">
              Ver sitio →
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-xs font-medium text-muted hover:text-ink"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
