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
async function middleware(request) {
    const { pathname, host } = request.nextUrl;
    // Obtenir le token d'authentification
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });
    // Extraire le subdomain
    const mainDomain = ("TURBOPACK compile-time value", "localhost:3000") || 'localhost:3000';
    const cleanHost = host.split(':')[0];
    const cleanMainDomain = mainDomain.split(':')[0];
    let subdomain = null;
    if (cleanHost !== cleanMainDomain && cleanHost !== 'localhost') {
        const parts = cleanHost.split('.');
        const mainParts = cleanMainDomain.split('.');
        if (parts.length > mainParts.length) {
            subdomain = parts[0];
        }
    }
    // ==========================================
    // ROUTES PUBLIQUES (pas besoin d'auth)
    // ==========================================
    const publicRoutes = [
        '/login',
        '/signup',
        '/api/auth',
        '/api/register'
    ];
    const isPublicRoute = publicRoutes.some((route)=>pathname.startsWith(route));
    if (isPublicRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // ==========================================
    // LANDING PAGE (domaine principal sans subdomain)
    // ==========================================
    if (!subdomain && pathname === '/') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // ==========================================
    // STORE FRONTEND (subdomain présent)
    // ==========================================
    if (subdomain && !pathname.startsWith('/dashboard') && !pathname.startsWith('/admin')) {
        // Rediriger vers la page store
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(new URL(`/store/${subdomain}${pathname}`, request.url));
    }
    // ==========================================
    // PROTECTION DES ROUTES DASHBOARD
    // ==========================================
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
        // Vérifier si l'utilisateur est authentifié
        if (!token) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
        }
        // SUPER ADMIN routes
        if (pathname.startsWith('/admin')) {
            if (token.role !== 'SUPER_ADMIN') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/dashboard', request.url));
            }
        }
        // TENANT ADMIN/USER routes
        if (pathname.startsWith('/dashboard')) {
            if (token.role === 'CUSTOMER') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/', request.url));
            }
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */ '/((?!_next/static|_next/image|favicon.ico|public).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f47b7172._.js.map