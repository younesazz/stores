import "./globals.css"
import { ToastProvider } from "@/components/ui/toaster"
import { LangProvider } from "@/lib/lang-store"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors">
        <LangProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </LangProvider>
      </body>
    </html>
  )
}
