"use client"

import { useEffect, useRef } from "react"
import { LineChart } from "lucide-react"

export function MarketOverview() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ""
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "1D",
      showChart: true,
      locale: "fr",
      width: "100%",
      height: "600",
      isTransparent: false,
      tabs: [
        {
          title: "Devises majeures",
          symbols: [
            { s: "FX_IDC:EURUSD" },
            { s: "FX_IDC:GBPUSD" },
            { s: "FX_IDC:USDJPY" },
            { s: "FX_IDC:USDCHF" },
            { s: "FX_IDC:USDCAD" },
            { s: "FX_IDC:AUDUSD" },
            { s: "FX_IDC:NZDUSD" },
            { s: "FX_IDC:USDCNY" },
          ],
        },
        {
          title: "Devises croisées",
          symbols: [
            { s: "FX_IDC:EURGBP" },
            { s: "FX_IDC:EURJPY" },
            { s: "FX_IDC:GBPJPY" },
            { s: "FX_IDC:EURCHF" },
            { s: "FX_IDC:AUDJPY" },
            { s: "FX_IDC:EURAUD" },
          ],
        },
        {
          title: "Matières premières",
          symbols: [
            { s: "OANDA:XAUUSD", d: "Or" },
            { s: "OANDA:XAGUSD", d: "Argent" },
            { s: "TVC:USOIL", d: "Pétrole WTI" },
            { s: "TVC:UKOIL", d: "Pétrole Brent" },
            { s: "TVC:NATURALGAS", d: "Gaz naturel" },
            { s: "COMEX:HG1!", d: "Cuivre" },
          ],
        },
        {
          title: "Crypto",
          symbols: [
            { s: "BITSTAMP:BTCUSD", d: "Bitcoin" },
            { s: "BITSTAMP:ETHUSD", d: "Ethereum" },
            { s: "BINANCE:SOLUSDT", d: "Solana" },
            { s: "BINANCE:BNBUSDT", d: "BNB" },
            { s: "BINANCE:XRPUSDT", d: "XRP" },
          ],
        },
        {
          title: "Indices",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
            { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
            { s: "FOREXCOM:DJI", d: "Dow Jones" },
            { s: "XETR:DAX", d: "DAX (Allemagne)" },
            { s: "FOREXCOM:UKXGBP", d: "FTSE 100" },
          ],
        },
      ],
    })
    containerRef.current.appendChild(script)
  }, [])

  return (
    <section aria-labelledby="market-title" className="mx-auto max-w-6xl px-3 sm:px-4 pt-6 sm:pt-10 pb-10">
      <div className="flex items-center gap-2">
        <LineChart className="size-5" aria-hidden="true" />
        <h2 id="market-title" className="text-lg font-bold tracking-tight sm:text-2xl">
          MARCHÉS EN DIRECT
        </h2>
      </div>
      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
        Données intraday réelles — devises majeures et croisées, matières premières, cryptomonnaies et indices.
      </p>
      <div className="mt-5 rounded-2xl border bg-card overflow-hidden">
        <div ref={containerRef} className="tradingview-widget-container" />
      </div>
    </section>
  )
}
