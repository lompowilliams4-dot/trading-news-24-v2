import { Newspaper } from "lucide-react"

type NewsItem = {
  title: string
  link: string
  pubDate: string
  source: string
}

const FEEDS: { url: string; source: string }[] = [
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/", source: "CoinDesk" },
  { url: "https://www.kitco.com/rss/KitcoNews.xml", source: "Kitco" },
  { url: "https://oilprice.com/rss/main", source: "OilPrice" },
]

// Parseur RSS minimal (regex) : évite d'ajouter une dépendance npm juste pour ça.
// Fonctionne sur les flux RSS 2.0 standards (title / link / pubDate dans chaque <item>).
function parseRss(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = []
  const itemBlocks = xml.split("<item>").slice(1)
  for (const block of itemBlocks.slice(0, 8)) {
    const title = block.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/s)?.[1]?.trim()
    const link = block.match(/<link>(.*?)<\/link>/s)?.[1]?.trim()
    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/s)?.[1]?.trim()
    if (title && link && pubDate) {
      items.push({ title, link, pubDate, source })
    }
  }
  return items
}

async function fetchFeed(feed: { url: string; source: string }): Promise<NewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      next: { revalidate: 300 }, // recharge côté serveur toutes les 5 minutes
      headers: { "User-Agent": "TradingNews24/1.0" },
    })
    if (!res.ok) return []
    const xml = await res.text()
    return parseRss(xml, feed.source)
  } catch {
    return []
  }
}

function timeAgo(pubDate: string): string {
  const diffMs = Date.now() - new Date(pubDate).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "à l'instant"
  if (minutes < 60) return `il y a ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours} h`
  const days = Math.floor(hours / 24)
  return `il y a ${days} j`
}

export async function NewsFeed() {
  const results = await Promise.all(FEEDS.map(fetchFeed))
  const allItems = results
    .flat()
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 15)

  return (
    <section aria-labelledby="news-title" className="mx-auto max-w-6xl px-3 sm:px-4 pt-6 sm:pt-10">
      <div className="flex items-center gap-2">
        <Newspaper className="size-5" aria-hidden="true" />
        <h2 id="news-title" className="text-lg font-bold tracking-tight sm:text-2xl">
          ACTUALITÉS
        </h2>
      </div>
      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
        Dernières informations financières, triées par heure de publication.
      </p>

      <div className="mt-5 divide-y rounded-2xl border bg-card overflow-hidden">
        {allItems.length === 0 && (
          <div className="p-5 text-sm text-muted-foreground">
            Actualités temporairement indisponibles — nouvelle tentative dans quelques instants.
          </div>
        )}
        {allItems.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between gap-3 p-4 sm:p-5 hover:bg-muted/50 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-sm sm:text-[15px] font-medium leading-snug">{item.title}</p>
              <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground">
                {item.source} · {timeAgo(item.pubDate)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
