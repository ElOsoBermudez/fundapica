import { newsItems } from "./data"
import { NewsList } from "./components/NewsList"

export default function NewsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <NewsList items={newsItems} />
      </div>
    </div>
  )
}
