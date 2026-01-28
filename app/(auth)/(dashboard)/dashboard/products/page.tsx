import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import ProductsClient from "@/components/products/ProductsClient"

export const dynamic = "force-dynamic"

async function getProducts(tenantId: string) {
  return prisma.product.findMany({
    where: { store: { tenantId } },
    include: { store: true },
    orderBy: { createdAt: "desc" },
    take: 100, // ممكن تبدلها pagination server لاحقًا
  })
}

async function getStores(tenantId: string) {
  return prisma.store.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  })
}

export default async function ProductsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.tenantId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
        Erreur: Tenant non trouvé
      </div>
    )
  }

  const [products, stores] = await Promise.all([
    getProducts(session.user.tenantId),
    getStores(session.user.tenantId),
  ])

  return (
    <ProductsClient
      stores={stores}
      products={products.map((p: { id: any; store: { id: any }; createdAt: any }) => ({
        id: String(p.id),
        name: (p as any).name ?? (p as any).title ?? "Produit",
        price: Number((p as any).price ?? 0),
        stock: Number((p as any).stock ?? (p as any).quantity ?? 0),
        status: String((p as any).status ?? ((p as any).isActive ? "ACTIVE" : "DRAFT")),
        storeId: String((p as any).storeId ?? p.store?.id ?? ""),
        storeName: (p.store as any)?.name ?? "Boutique",
        createdAt: p.createdAt,
      }))}
    />
  )
}
