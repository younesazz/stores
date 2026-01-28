// app/storefront/[subdomain]/layout.tsx
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
    where: {
      subdomain: params.subdomain,
      isActive: true,
    },
    select: {
      name: true,
      subdomain: true,
      primaryColor: true,
      accentColor: true,
      currency: true,
    },
  })

  if (!store) notFound()

  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/* Header */}
        <header
          className="border-b"
          style={{ borderColor: store.accentColor }}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <h1
              className="text-xl font-bold"
              style={{ color: store.primaryColor }}
            >
              {store.name}
            </h1>

            <nav className="flex gap-4 text-sm">
              <a href="/" className="hover:underline">
                Accueil
              </a>
              <a href="/cart" className="hover:underline">
                Panier
              </a>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-7xl px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t mt-12">
          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} {store.name}
          </div>
        </footer>
      </body>
    </html>
  )
}
