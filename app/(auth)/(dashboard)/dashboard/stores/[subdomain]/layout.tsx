import StorefrontNavbar from "@/app/storefront/StorefrontNavbar"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function StorefrontLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { subdomain: string }
}) {
  const store = await prisma.store.findFirst({
    where: { subdomain: params.subdomain, isActive: true },
    select: {
      id: true,
      name: true,
      subdomain: true,
      logo: true,
      primaryColor: true,
      secondaryColor: true,
      accentColor: true,
      currency: true,
    },
  })

  if (!store) notFound()

  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900">
        {/* Theme colors from DB */}
        <div
          style={
            {
              ["--store-primary" as any]: store.primaryColor,
              ["--store-accent" as any]: store.accentColor,
              ["--store-secondary" as any]: store.secondaryColor,
            } as React.CSSProperties
          }
        >
          <StorefrontNavbar
            store={{
              id: store.id,
              name: store.name,
              subdomain: store.subdomain,
              logo: store.logo,
              currency: store.currency,
            }}
          />

          <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>

          <footer className="border-t bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-500">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} {store.name}. Tous droits réservés.</p>
                <div className="flex gap-4">
                  <a className="hover:text-slate-900" href="#">Conditions</a>
                  <a className="hover:text-slate-900" href="#">Contact</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
