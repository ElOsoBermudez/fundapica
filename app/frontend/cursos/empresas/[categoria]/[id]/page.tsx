import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { slugify } from "@/components/cursos/data"
import { Badge } from "@/components/ui/badge"
import { PdfViewer } from "@/components/cursos/pdf-viewer"

type Props = {
  params: Promise<{ categoria: string; id: string }>
}

export default async function EmpresasCursoDetailPage({ params }: Props) {
  const { categoria, id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: curso } = await supabase
    .from("cursos")
    .select("*, categorias_cursos(nombre, tipo)")
    .eq("id", id)
    .single()

  if (!curso) notFound()

  const catNombre = (curso.categorias_cursos as unknown as { nombre: string } | null)?.nombre ?? null
  if (catNombre && slugify(catNombre) !== categoria) notFound()

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <Link
          href={`/frontend/cursos/empresas/${categoria}`}
          className="inline-flex items-center font-sans text-sm font-semibold text-[#75A5E3] transition-colors hover:text-[#E05780]"
        >
          <ChevronLeft className="size-4" />
          Volver a {catNombre ?? "empresas"}
        </Link>

        <article className="mt-6 overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_10px_30px_rgba(17,17,17,0.06)]">
          {curso.imagen_url && (
            <div className="relative aspect-[16/8] w-full overflow-hidden">
              <Image
                src={curso.imagen_url}
                alt={curso.titulo}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-wrap items-center gap-3">
              {catNombre && (
                <Badge className="rounded-full border-0 bg-[#EAFCFC] px-3 py-1 text-[#75A5E3]">
                  {catNombre}
                </Badge>
              )}
              <span className="font-[family:var(--font-body)] text-sm text-black/55">Empresas</span>
            </div>

            <div className="mt-5 max-w-3xl space-y-4">
              <h1 className="font-sans text-4xl font-extrabold tracking-[-0.05em] text-[#E05780] sm:text-6xl">
                {curso.titulo}
              </h1>
              {curso.descripcion && (
                <p className="font-[family:var(--font-body)] text-lg text-black/65">
                  {curso.descripcion}
                </p>
              )}
              <div className="py-5">
                <div className="h-[0.5px] bg-[#E05780]" />
              </div>
            </div>

            {curso.contenido && (
              <div
                className="mt-8 prose prose-lg max-w-none font-[family:var(--font-body)] text-[17px] leading-[1.3em] text-black/75"
                dangerouslySetInnerHTML={{ __html: curso.contenido }}
              />
            )}

            {curso.pdf_url && (
              <div className="mt-8">
                <PdfViewer url={curso.pdf_url} />
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  )
}
