"use client"

import { useEffect, useRef } from "react"

const SYMBOLS = [
  { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
  { proName: "FX_IDC:GBPUSD", title: "GBP/USD" },
  { proName: "FX_IDC:USDJPY", title: "USD/JPY" },
  { proName: "FX_IDC:USDCNY", title: "USD/CNY" },
  { proName: "OANDA:XAUUSD", title: "Or (XAU/USD)" },
  { proName: "TVC:USOIL", title: "Pétrole WTI" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
  { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
]

export function TickerTape() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ""
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: SYMBOLS,
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "fr",
    })
    containerRef.current.appendChild(script)
  }, [])

  return (
    <div className="border-b bg-card">
      <div ref={containerRef} className="tradingview-widget-container" />
    </div>
  )
}
