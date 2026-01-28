import ProductGrid from "@/app/storefront/ProductGrid"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default async function StorefrontHome({ params }: { params: { subdomain: string } }) {
    const store = await prisma.store.findFirst({
        where: {
          subdomain: params.subdomain,
          isActive: true,
        },
      })
      
      

  if (!store) notFound()

  const categories = await prisma.category.findMany({
    where: { storeId: store.id, isActive: true },
    select: { id: true, name: true, slug: true },
    orderBy: { order: "asc" },
  })

  const products = await prisma.product.findMany({
    where: { storeId: store.id, status: "PUBLISHED" },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      comparePrice: true,
      featuredImage: true,
      images: true,
      quantity: true,
      categoryId: true,
    },
    orderBy: { createdAt: "desc" },
    take: 48,
  })

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-white">
        <div className="absolute inset-0 opacity-[0.08]" style={{ background: "radial-gradient(circle at 20% 20%, var(--store-primary), transparent 40%), radial-gradient(circle at 80% 0%, var(--store-accent), transparent 35%)" }} />
        <div className="relative p-6 sm:p-10">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
              Livraison partout en Algérie 🇩🇿
            </p>
            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
              Bienvenue chez <span style={{ color: "var(--store-primary)" }}>{store.name}</span>
            </h1>
            <p className="mt-3 text-slate-600">
              {store.description || "Découvrez nos produits et commandez en quelques clics."}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--store-primary)" }}
              >
                Voir les produits
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold hover:bg-slate-50"
              >
                Parcourir les catégories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-bold">Catégories</h2>
          <p className="text-sm text-slate-500">{categories.length} catégories</p>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-slate-500">
            Aucune catégorie pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((c: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
              <a
                key={c.id}
                href={`#products`}
                className="rounded-2xl border bg-white p-4 hover:bg-slate-50 transition"
              >
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="mt-1 text-xs text-slate-500">Voir produits</p>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Products */}
      <section id="products" className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-bold">Produits</h2>
          <p className="text-sm text-slate-500">{products.length} produits</p>
        </div>

        <ProductGrid
          store={{
            id: store.id,
            currency: store.currency,
            subdomain: params.subdomain,
          }}
          categories={categories}
          initialProducts={products}
        />
      </section>
    </div>
  )
}
