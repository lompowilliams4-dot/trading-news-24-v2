"use client"

import { useEffect, useState } from "react"

function formatTimeAgo(pubDate: string): string {
  const diffMs = Date.now() - new Date(pubDate).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "à l'instant"
  if (minutes < 60) return `il y a ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours} h`
  const days = Math.floor(hours / 24)
  return `il y a ${days} j`
}

export function TimeAgo({ pubDate }: { pubDate: string }) {
  const [label, setLabel] = useState(() => formatTimeAgo(pubDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setLabel(formatTimeAgo(pubDate))
    }, 30_000) // recalcule toutes les 30 secondes, sans recharger la page
    return () => clearInterval(interval)
  }, [pubDate])

  return <>{label}</>
}
