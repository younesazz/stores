// app/storefront/[subdomain]/page.tsx
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default async function StorefrontHome({
  params,
}: {
  params: { subdomain: string }
}) {
  const store = await prisma.store.findFirst({
    where: { subdomain: params.subdomain, isActive: true },
    select: { id: true, name: true, currency: true },
  })

  if (!store) notFound()

  const products = await prisma.product.findMany({
    where: { storeId: store.id, status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 24,
  })

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-white p-6">
        <h2 className="text-2xl font-bold">{store.name}</h2>
        <p className="mt-1 text-slate-500">Découvrez nos produits</p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
          Aucun produit publié pour le moment.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p: { id: Key | null | undefined; slug: any; featuredImage: any; images: any[]; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="rounded-2xl border bg-white p-4 hover:bg-slate-50 transition"
            >
              <div className="aspect-square rounded-xl bg-slate-100 overflow-hidden">
                <img
                  src={p.featuredImage || p.images?.[0] || "/placeholder.png"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3">
                <p className="font-semibold line-clamp-1">{p.name}</p>
                <p className="text-sm text-slate-600 mt-1">
                  {p.price} {store.currency}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
