import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import { ShoppingBag, Package, DollarSign, Store } from "lucide-react"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

async function getDashboardStats(tenantId: string) {
  const [stores, products, orders, totalRevenue] = await Promise.all([
    prisma.store.count({ where: { tenantId } }),
    prisma.product.count({ where: { store: { tenantId } } }),
    prisma.order.count({ where: { store: { tenantId } } }),
    prisma.order.aggregate({
      where: {
        store: { tenantId },
        orderStatus: { in: ["DELIVERED", "SHIPPED", "PROCESSING"] },
      },
      _sum: { total: true },
    }),
  ])

  return {
    stores,
    products,
    orders,
    revenue: totalRevenue._sum.total || 0,
  }
}

async function getRecentOrders(tenantId: string) {
  return prisma.order.findMany({
    where: { store: { tenantId } },
    include: { store: true, wilaya: true, commune: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  })
}

function StatCard({
  title,
  value,
  description,
  Icon,
  iconClassName,
}: {
  title: string
  value: React.ReactNode
  description: string
  Icon: React.ComponentType<{ className?: string }>
  iconClassName?: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between p-5 pb-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <Icon className={`h-5 w-5 ${iconClassName ?? "text-slate-700"}`} />
      </div>
      <div className="px-5 pb-5">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "DELIVERED"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "CANCELLED"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-blue-50 text-blue-700 border-blue-200"

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${cls}`}>
      {status}
    </span>
  )
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.tenantId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
        Erreur: Tenant non trouvé
      </div>
    )
  }

  const stats = await getDashboardStats(session.user.tenantId)
  const recentOrders = await getRecentOrders(session.user.tenantId)

  const statCards = [
    {
      title: "Boutiques",
      value: stats.stores,
      Icon: Store,
      description: "Boutiques actives",
      iconClassName: "text-blue-600",
    },
    {
      title: "Produits",
      value: stats.products,
      Icon: Package,
      description: "Total des produits",
      iconClassName: "text-emerald-600",
    },
    {
      title: "Commandes",
      value: stats.orders,
      Icon: ShoppingBag,
      description: "Toutes les commandes",
      iconClassName: "text-purple-600",
    },
    {
      title: "Revenu",
      value: formatPrice(stats.revenue),
      Icon: DollarSign,
      description: "Revenu total",
      iconClassName: "text-amber-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="mt-2 text-slate-500">
          Bienvenue, {session.user.name} 👋
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            description={s.description}
            Icon={s.Icon}
            iconClassName={s.iconClassName}
          />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Commandes récentes</h2>
        </div>

        <div className="p-5">
          {recentOrders.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>Aucune commande pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order: { id: Key | null | undefined; orderNumber: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; customerName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; wilaya: { name: any }; createdAt: string | number | Date; total: number; orderStatus: string }) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-slate-900">{order.orderNumber}</p>
                    <p className="text-sm text-slate-500">
                      {order.customerName} • {order.wilaya?.name ?? ""}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <div className="md:text-right space-y-1">
                    <p className="font-semibold text-slate-900">{formatPrice(order.total)}</p>
                    <StatusPill status={order.orderStatus} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
