// app/storefront/[subdomain]/product/[slug]/page.tsx
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function ProductPage({
  params,
}: {
  params: { subdomain: string; slug: string }
}) {
  const product = await prisma.product.findFirst({
    where: {
      slug: params.slug,
      status: "PUBLISHED",
      store: {
        subdomain: params.subdomain,
        isActive: true,
      },
    },
    include: {
      store: {
        select: {
          name: true,
          currency: true,
          primaryColor: true,
        },
      },
      category: {
        select: { name: true },
      },
      variants: true,
    },
  })

  if (!product) notFound()

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Image */}
      <div className="aspect-square rounded-2xl border bg-white overflow-hidden">
        <img
          src={
            product.featuredImage ||
            product.images?.[0] ||
            "/placeholder.png"
          }
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {product.category && (
          <p className="text-sm text-slate-500">
            Catégorie : {product.category.name}
          </p>
        )}

        <p className="text-2xl font-semibold">
          {product.price} {product.store.currency}
        </p>

        {product.quantity > 0 ? (
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
            En stock
          </span>
        ) : (
          <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-sm text-red-700">
            Rupture de stock
          </span>
        )}

        {product.description && (
          <p className="text-slate-600">{product.description}</p>
        )}

        {/* Variants (optional) */}
        {product.variants.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Options</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <button
                  key={v.id}
                  className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-100"
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="mt-6 w-full rounded-xl px-4 py-3 text-white font-semibold"
          style={{ backgroundColor: product.store.primaryColor }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}
