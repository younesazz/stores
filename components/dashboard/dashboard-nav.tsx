"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Settings,
  Palette,
  BarChart3,
} from "lucide-react"

interface DashboardNavProps {
  user: {
    role: string
  }
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Boutiques",
      href: "/dashboard/stores",
      icon: Store,
    },
    {
      title: "Produits",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Commandes",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Personnalisation",
      href: "/dashboard/customize",
      icon: Palette,
    },
    {
      title: "Analytiques",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Paramètres",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="w-64 border-r bg-white min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100",
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}