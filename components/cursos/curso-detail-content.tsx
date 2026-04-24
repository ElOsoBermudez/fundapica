"use client"

import { useLanguage } from "@/lib/i18n/language-context"

type Props = {
  titulo: string
  titulo_ca: string | null
  descripcion: string | null
  descripcion_ca: string | null
  contenido: string | null
  contenido_ca: string | null
}

export function CursoDetailContent({ titulo, titulo_ca, descripcion, descripcion_ca, contenido, contenido_ca }: Props) {
  const { language } = useLanguage()
  const displayTitulo = language === "ca" ? (titulo_ca ?? titulo) : titulo
  const displayDescripcion = language === "ca" ? (descripcion_ca ?? descripcion) : descripcion
  const displayContenido = language === "ca" ? (contenido_ca ?? contenido) : contenido

  return (
    <>
      <h1 className="font-sans text-4xl font-extrabold tracking-[-0.05em] text-[#E05780] sm:text-6xl">
        {displayTitulo}
      </h1>
      {displayDescripcion && (
        <p className="font-[family:var(--font-body)] text-lg text-black/65">
          {displayDescripcion}
        </p>
      )}
      <div className="py-5">
        <div className="h-[0.5px] bg-[#E05780]" />
      </div>
      {displayContenido && (
        <div
          className="mt-8 prose prose-lg max-w-none font-[family:var(--font-body)] text-[17px] leading-[1.3em] text-black/75"
          dangerouslySetInnerHTML={{ __html: displayContenido }}
        />
      )}
    </>
  )
}
