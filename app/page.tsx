import { TickerTape } from "@/components/ticker-tape"
import { NewsFeed } from "@/components/news-feed"
import { EconomicCalendar } from "@/components/economic-calendar"
import { MarketOverview } from "@/components/market-overview"

export default function Home() {
  return (
    <main>
      <TickerTape />
      <NewsFeed />
      <EconomicCalendar />
      <MarketOverview />
    </main>
  )
}
