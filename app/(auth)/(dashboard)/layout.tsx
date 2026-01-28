import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import DashboardHeader from "@/components/dashboard/dashboard-header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Rediriger les customers vers la page d'accueil
  if (session.user.role === "CUSTOMER") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={session.user} />
      <div className="flex">
        <DashboardNav user={session.user} />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}