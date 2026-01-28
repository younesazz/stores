(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StorefrontNavbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/ecomerceWebsite/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function getCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        return Array.isArray(cart) ? cart.reduce((a, i)=>a + (i.quantity || 1), 0) : 0;
    } catch  {
        return 0;
    }
}
function StorefrontNavbar({ store }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StorefrontNavbar.useEffect": ()=>{
            const refresh = {
                "StorefrontNavbar.useEffect.refresh": ()=>setCount(getCartCount())
            }["StorefrontNavbar.useEffect.refresh"];
            refresh();
            window.addEventListener("storage", refresh);
            window.addEventListener("cart:update", refresh);
            return ({
                "StorefrontNavbar.useEffect": ()=>{
                    window.removeEventListener("storage", refresh);
                    window.removeEventListener("cart:update", refresh);
                }
            })["StorefrontNavbar.useEffect"];
        }
    }["StorefrontNavbar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StorefrontNavbar.useEffect": ()=>{
            const onEsc = {
                "StorefrontNavbar.useEffect.onEsc": (e)=>e.key === "Escape" && setOpen(false)
            }["StorefrontNavbar.useEffect.onEsc"];
            document.addEventListener("keydown", onEsc);
            return ({
                "StorefrontNavbar.useEffect": ()=>document.removeEventListener("keydown", onEsc)
            })["StorefrontNavbar.useEffect"];
        }
    }["StorefrontNavbar.useEffect"], []);
    const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StorefrontNavbar.useMemo[basePath]": ()=>`/storefront/${store.subdomain}`
    }["StorefrontNavbar.useMemo[basePath]"], [
        store.subdomain
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b bg-white/80 backdrop-blur",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `${basePath}`,
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-10 w-10 rounded-2xl border bg-white grid place-items-center overflow-hidden",
                                children: store.logo ? // eslint-disable-next-line @next/next/no-img-element
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: store.logo,
                                    alt: store.name,
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-extrabold",
                                    style: {
                                        color: "var(--store-primary)"
                                    },
                                    children: store.name.slice(0, 1).toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "leading-tight",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold",
                                        children: store.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500",
                                        children: "Boutique en ligne"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden md:flex items-center gap-6 text-sm font-semibold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#categories",
                                className: "text-slate-700 hover:text-slate-900",
                                children: "Catégories"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#products",
                                className: "text-slate-700 hover:text-slate-900",
                                children: "Produits"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `${basePath}/cart`,
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-700 hover:text-slate-900",
                                        children: "Panier"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-2 -right-3 min-w-4.5 h-4.5 rounded-full text-[11px] px-1 grid place-items-center text-white",
                                        style: {
                                            backgroundColor: "var(--store-primary)"
                                        },
                                        children: count
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm",
                        onClick: ()=>setOpen((v)=>!v),
                        "aria-label": "Menu",
                        children: "☰"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden border-t bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 py-4 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            onClick: ()=>setOpen(false),
                            href: "#categories",
                            className: "block rounded-xl border p-3 font-semibold",
                            children: "Catégories"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            onClick: ()=>setOpen(false),
                            href: "#products",
                            className: "block rounded-xl border p-3 font-semibold",
                            children: "Produits"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$ecomerceWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>setOpen(false),
                            href: `${basePath}/cart`,
                            className: "block rounded-xl border p-3 font-semibold",
                            children: [
                                "Panier ",
                                count > 0 ? `(${count})` : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                    lineNumber: 98,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/website/ecomerceWebsite/app/stores/StorefrontNavbar.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(StorefrontNavbar, "UMP4y6A4u3Rit/MrcCunCU2vAVs=");
_c = StorefrontNavbar;
var _c;
__turbopack_context__.k.register(_c, "StorefrontNavbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_website_ecomerceWebsite_app_stores_StorefrontNavbar_tsx_76387c89._.js.map