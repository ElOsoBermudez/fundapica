import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import type { NewsItem } from "../types"

type NewsCardProps = {
  news: NewsItem
  featured?: boolean
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export function NewsCard({ news, featured = false }: NewsCardProps) {
  return (
    <article
      className={[
        "group h-full overflow-hidden rounded-[1.75rem] border border-black/8 bg-white shadow-[0_10px_30px_rgba(17,17,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(17,17,17,0.12)]",
        featured ? "grid gap-0 lg:grid-cols-[1.35fr_1fr]" : "flex flex-col",
      ].join(" ")}
    >
      <Link
        href={`/news/${news.id}`}
        className={featured ? "relative min-h-[320px] overflow-hidden lg:min-h-[420px]" : "relative block aspect-[16/10] overflow-hidden"}
      >
        {news.image ? (
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-neutral-100 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Sin imagen</span>
          </div>
        )}
      </Link>

      <div className={featured ? "flex flex-col justify-between p-6 sm:p-8" : "flex flex-1 flex-col p-5"}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge className="rounded-full border-0 bg-[#EAFCFC] px-3 py-1 text-[#75A5E3]">
              {news.category}
            </Badge>
            <span className="font-[family:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-black/45">
              {formatDate(news.publishedAt)}
            </span>
          </div>

          <div className="space-y-2">
            <h2
              className={[
                "font-sans font-bold tracking-[-0.04em] text-[#E05780] transition-colors group-hover:text-[#75A5E3]",
                featured ? "text-3xl leading-snug sm:text-4xl" : "text-xl leading-tight",
              ].join(" ")}
            >
              <Link href={`/news/${news.id}`}>{news.title}</Link>
            </h2>
            <p
              className={[
                "font-[family:var(--font-body)] text-black/65",
                featured ? "max-w-xl text-[18px] leading-7" : "text-[16px] leading-6",
              ].join(" ")}
            >
              {news.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/8 pt-4">
          <p className="font-[family:var(--font-body)] text-sm font-medium text-black/70">{news.author}</p>
          <Link
            href={`/news/${news.id}`}
            className="font-sans text-sm font-semibold text-[#75A5E3] transition-colors hover:text-[#E05780]"
          >
            Leer noticia
          </Link>
        </div>
      </div>
    </article>
  )
}
