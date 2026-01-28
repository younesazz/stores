import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import NewProductClient from "@/components/products/NewProductClient"

export const dynamic = "force-dynamic"

export default async function NewProductPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.tenantId) {
    return <div className="p-6">Unauthorized</div>
  }

  const [stores, categories] = await Promise.all([
    prisma.store.findMany({
      where: { tenantId: session.user.tenantId },
      select: { id: true, name: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      where: { store: { tenantId: session.user.tenantId } },
      select: { id: true, name: true, storeId: true },
      orderBy: { createdAt: "desc" },
      take: 500,
    }),
  ])

  return <NewProductClient stores={stores} categories={categories} />
}
