module.exports = [
"[project]/Desktop/website/ecomerceWebsite/app/favicon.ico.mjs { IMAGE => \"[project]/Desktop/website/ecomerceWebsite/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/app/favicon.ico.mjs { IMAGE => \"[project]/Desktop/website/ecomerceWebsite/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/website/ecomerceWebsite/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
// app/storefront/[subdomain]/product/[slug]/page.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
async function ProductPage({ params }) {
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.findFirst({
        where: {
            slug: params.slug,
            status: "PUBLISHED",
            store: {
                subdomain: params.subdomain,
                isActive: true
            }
        },
        include: {
            store: {
                select: {
                    name: true,
                    currency: true,
                    primaryColor: true
                }
            },
            category: {
                select: {
                    name: true
                }
            },
            variants: true
        }
    });
    if (!product) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-8 md:grid-cols-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aspect-square rounded-2xl border bg-white overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: product.featuredImage || product.images?.[0] || "/placeholder.png",
                    alt: product.name,
                    className: "h-full w-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold",
                        children: product.name
                    }, void 0, false, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    product.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500",
                        children: [
                            "Catégorie : ",
                            product.category.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-semibold",
                        children: [
                            product.price,
                            " ",
                            product.store.currency
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    product.quantity > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700",
                        children: "En stock"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block rounded-full bg-red-50 px-3 py-1 text-sm text-red-700",
                        children: "Rupture de stock"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    product.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-600",
                        children: product.description
                    }, void 0, false, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    product.variants.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium mb-2",
                                children: "Options"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: product.variants.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-lg border px-3 py-1 text-sm hover:bg-slate-100",
                                        children: v.name
                                    }, v.id, false, {
                                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "mt-6 w-full rounded-xl px-4 py-3 text-white font-semibold",
                        style: {
                            backgroundColor: product.store.primaryColor
                        },
                        children: "Ajouter au panier"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/app/storefront/[subdomain]/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7ce6c5cc._.js.map