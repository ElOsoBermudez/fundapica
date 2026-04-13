import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

const protectedPrefixes = ["/backend/backoffice/panel"];

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname, search } = request.nextUrl;
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isProtectedRoute || user) {
    return response;
  }

  const loginUrl = new URL("/backend/backoffice", request.url);
  loginUrl.searchParams.set("reason", "auth-required");
  loginUrl.searchParams.set("next", `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/backend/backoffice/:path*"],
};
