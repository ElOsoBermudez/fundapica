"use client"

import { useLanguage } from "@/lib/i18n/language-context"

type Props = {
  titulo: string
  titulo_ca: string | null
  contenido: string | null
  contenido_ca: string | null
}

export function NewsDetailContent({ titulo, titulo_ca, contenido, contenido_ca }: Props) {
  const { language } = useLanguage()
  const displayTitle = language === "ca" ? (titulo_ca ?? titulo) : titulo
  const displayContent = language === "ca" ? (contenido_ca ?? contenido) : contenido

  return (
    <>
      <h1 className="font-sans text-4xl font-extrabold tracking-[-0.05em] text-[#E05780] sm:text-6xl">
        {displayTitle}
      </h1>
      <div className="py-5">
        <div className="h-[0.5px] bg-[#E05780]" />
      </div>
      {displayContent && (
        <div
          className="prose prose-lg max-w-none font-[family:var(--font-body)] text-[17px] leading-[1.3em] text-black/75"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      )}
    </>
  )
}
