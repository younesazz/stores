"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Skeleton from "@/components/skeleton"
import RevenueChart from "@/components/charts/revenue-chart"
import OrdersChart from "@/components/charts/orders-chart"
import { statusLabel, statusClasses, Lang } from "@/lib/order-status"
import { formatPrice } from "@/lib/utils"

type StatCards = {
  stores: number
  products: number
  orders: number
  revenue: number
}

type RecentOrder = {
  id: string
  orderNumber: string
  customerName: string
  createdAt: string | Date
  total: number
  orderStatus: string
  wilaya?: { name?: string | null } | null
}

export default function DashboardClient({
  stats,
  recentOrders,
  lang = "fr",
}: {
  stats: StatCards
  recentOrders: RecentOrder[]
  lang?: Lang
}) {
  // 🦴 show skeleton during hydration
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  // simple chart data (last 7 items from recent orders)
  const ordersChart = useMemo(() => {
    const items = recentOrders.slice(0, 7).reverse()
    return items.map((o, i) => ({
      label: new Date(o.createdAt).toLocaleDateString(lang === "ar" ? "ar-DZ" : lang === "en" ? "en-US" : "fr-FR", { month: "short", day: "2-digit" }),
      value: 1,
    }))
  }, [recentOrders, lang])

  const revenueChart = useMemo(() => {
    const items = recentOrders.slice(0, 7).reverse()
    return items.map((o) => ({
      label: new Date(o.createdAt).toLocaleDateString(lang === "ar" ? "ar-DZ" : lang === "en" ? "en-US" : "fr-FR", { month: "short", day: "2-digit" }),
      value: Number(o.total || 0),
    }))
  }, [recentOrders, lang])

  if (!hydrated) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-3 h-4 w-56" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-[340px]" />
          <Skeleton className="h-[340px]" />
        </div>

        <Skeleton className="h-[420px]" />
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-8">
      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Revenue (7 derniers)</p>
          <RevenueChart data={revenueChart} />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Orders (7 derniers)</p>
          <OrdersChart data={ordersChart} />
        </div>
      </div>

      {/* Recent Orders list (same UI style) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="border-b border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Commandes récentes</h2>
        </div>

        <div className="p-5">
          {recentOrders.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              <p>Aucune commande pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-900 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-slate-900 dark:text-white">{order.orderNumber}</p>
                    <p className="text-sm text-slate-500">
                      {order.customerName} • {order.wilaya?.name ?? ""}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString(lang === "ar" ? "ar-DZ" : lang === "en" ? "en-US" : "fr-FR")}
                    </p>
                  </div>

                  <div className="md:text-right space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {formatPrice(order.total)}
                    </p>
                    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${statusClasses(order.orderStatus)}`}>
                      {statusLabel(order.orderStatus, lang)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
