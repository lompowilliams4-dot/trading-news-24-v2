import type { Metadata } from "next"
import "./globals.css"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Trading News 24",
  description: "Actualités financières en temps réel",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-background text-foreground antialiased">
        <header className="border-b">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-foreground text-background flex items-center justify-center font-bold">
                TN
              </div>
              <div>
                <div className="font-bold tracking-tight text-lg leading-none">
                  TRADING NEWS <span className="text-emerald-600">24</span>
                </div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Le marché en temps réel
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
