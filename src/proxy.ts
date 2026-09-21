import { OWNER_ID } from "@/lib/auth/admin";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";

  if (!isLoginRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("next", pathname === "/adminsalazar" ? "/adminsalazar" : "/admin");
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach(cookie => redirect.cookies.set(cookie));
    redirect.headers.set("X-Robots-Tag", "noindex, nofollow");
    return redirect;
  }

  if (!isLoginRoute && user?.id !== OWNER_ID) {
    return new NextResponse("Acceso restringido a la cuenta del propietario.", { status: 403, headers: { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" } });
  }

  if (isLoginRoute && user?.id === OWNER_ID) {
    const url = request.nextUrl.clone();
    url.pathname = request.nextUrl.searchParams.get("next") === "/adminsalazar" ? "/adminsalazar" : "/admin";
    url.search = "";
    const redirect = NextResponse.redirect(url);
    response.cookies.getAll().forEach(cookie => redirect.cookies.set(cookie));
    redirect.headers.set("Cache-Control", "private, no-store");
    redirect.headers.set("X-Robots-Tag", "noindex, nofollow");
    return redirect;
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/adminsalazar/:path*"],
};
