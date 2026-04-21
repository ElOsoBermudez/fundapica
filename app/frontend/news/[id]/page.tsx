import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"

import { newsItems } from "../data"

type NewsDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params
  const article = newsItems.find((item) => item.id === id)

  if (!article) {
    notFound()
  }

  const relatedArticles = newsItems
    .filter((item) => item.category === article.category && item.id !== article.id)
    .slice(0, 3)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <Link
          href="/news"
          className="inline-flex items-center font-sans text-sm font-semibold text-[#75A5E3] transition-colors hover:text-[#E05780]"
        >
          Volver a noticias
        </Link>

        <article className="mt-6 overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_10px_30px_rgba(17,17,17,0.06)]">
          <div className="relative aspect-[16/8] w-full overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full border-0 bg-[#EAFCFC] px-3 py-1 text-[#75A5E3]">
                {article.category}
              </Badge>
              <span className="font-[family:var(--font-body)] text-sm text-black/55">
                {formatDate(article.publishedAt)}
              </span>
              <span className="font-[family:var(--font-body)] text-sm text-black/55">Por {article.author}</span>
            </div>

            <div className="mt-5 max-w-3xl space-y-4">
              <h1 className="font-sans text-4xl font-extrabold tracking-[-0.05em] text-[#E05780] sm:text-6xl">
                {article.title}
              </h1>
              <p className="font-[family:var(--font-body)] text-[18px] leading-8 text-black/65">
                {article.description}
              </p>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-6">
                {article.content.map((paragraph) => (
                  <p key={paragraph} className="font-[family:var(--font-body)] text-[17px] leading-8 text-black/75">
                    {paragraph}
                  </p>
                ))}
              </div>

              <aside className="rounded-[1.5rem] border border-black/8 bg-[#F8FAFC] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#75A5E3]">
                  Relacionadas
                </p>
                <div className="mt-4 space-y-4">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.id}`}
                      className="block rounded-2xl border border-black/8 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <p className="font-[family:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-black/45">
                        {item.category}
                      </p>
                      <h2 className="mt-2 font-sans text-base font-bold leading-snug text-[#E05780]">
                        {item.title}
                      </h2>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
