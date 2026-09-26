"use client"

import { useEffect, useRef } from "react"
import { CalendarDays } from "lucide-react"

export function EconomicCalendar() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ""
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      isTransparent: false,
      width: "100%",
      height: "500",
      locale: "fr",
      importanceFilter: "0,1",
    })
    containerRef.current.appendChild(script)
  }, [])

  return (
    <section aria-labelledby="calendar-title" className="mx-auto max-w-6xl px-3 sm:px-4 pt-6 sm:pt-10">
      <div className="flex items-center gap-2">
        <CalendarDays className="size-5" aria-hidden="true" />
        <h2 id="calendar-title" className="text-lg font-bold tracking-tight sm:text-2xl">
          CALENDRIER ÉCONOMIQUE
        </h2>
      </div>
      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
        Les prochains événements qui peuvent faire bouger les marchés.
      </p>
      <div className="mt-5 rounded-2xl border bg-card overflow-hidden">
        <div ref={containerRef} className="tradingview-widget-container" />
      </div>
    </section>
  )
}
