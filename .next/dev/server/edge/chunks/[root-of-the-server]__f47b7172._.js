(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f47b7172._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Desktop/website/ecomerceWebsite/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
;
;
function getSubdomainFromHost(host) {
    const hostname = host.split(":")[0] // remove port
    ;
    // localhost: sub.localhost (rare) OR lvh.me: sub.lvh.me
    // if you use zaza.lvh.me -> subdomain = zaza
    const parts = hostname.split(".").filter(Boolean);
    if (parts.length < 3) return null // ex: lvh.me or localhost
    ;
    return parts[0];
}
async function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const host = request.headers.get("host") || "";
    // ✅ Auth token (for dashboard/admin)
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });
    // ✅ Public routes
    const publicRoutes = [
        "/login",
        "/signup",
        "/api/auth",
        "/api/register"
    ];
    if (publicRoutes.some((r)=>pathname.startsWith(r))) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // ✅ Ignore next internals / static
    if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico") || pathname.match(/\.(.*)$/)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // ✅ Subdomain detection
    const subdomain = getSubdomainFromHost(host);
    // ==========================================
    // STORE FRONTEND (subdomain present)
    // ==========================================
    // Any request on zaza.lvh.me:3000/.... -> /storefront/zaza/....
    if (subdomain && !pathname.startsWith("/dashboard") && !pathname.startsWith("/admin")) {
        const url = request.nextUrl.clone();
        url.pathname = `/storefront/${subdomain}${pathname === "/" ? "" : pathname}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(url);
    }
    // ==========================================
    // PROTECT DASHBOARD / ADMIN
    // ==========================================
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
        if (!token) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
        }
        // admin only
        if (pathname.startsWith("/admin") && token.role !== "SUPER_ADMIN") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
        }
        // tenant dashboard: block CUSTOMER
        if (pathname.startsWith("/dashboard") && token.role === "CUSTOMER") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", request.url));
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f47b7172._.js.map