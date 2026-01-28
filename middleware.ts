import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

function getSubdomainFromHost(host: string) {
  const hostname = host.split(":")[0] // remove port

  // localhost: sub.localhost (rare) OR lvh.me: sub.lvh.me
  // if you use zaza.lvh.me -> subdomain = zaza
  const parts = hostname.split(".").filter(Boolean)
  if (parts.length < 3) return null // ex: lvh.me or localhost

  return parts[0]
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const host = request.headers.get("host") || ""

  // ✅ Auth token (for dashboard/admin)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // ✅ Public routes
  const publicRoutes = ["/login", "/signup", "/api/auth", "/api/register"]
  if (publicRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.next()
  }

  // ✅ Ignore next internals / static
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next()
  }

  // ✅ Subdomain detection
  const subdomain = getSubdomainFromHost(host)

  // ==========================================
  // STORE FRONTEND (subdomain present)
  // ==========================================
  // Any request on zaza.lvh.me:3000/.... -> /storefront/zaza/....
  if (subdomain && !pathname.startsWith("/dashboard") && !pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone()
    url.pathname = `/storefront/${subdomain}${pathname === "/" ? "" : pathname}`
    return NextResponse.rewrite(url)
  }

  // ==========================================
  // PROTECT DASHBOARD / ADMIN
  // ==========================================
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // admin only
    if (pathname.startsWith("/admin") && token.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // tenant dashboard: block CUSTOMER
    if (pathname.startsWith("/dashboard") && token.role === "CUSTOMER") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
