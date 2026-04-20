import { FolderKanban, ImageIcon, ShieldCheck, UploadCloud } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LinkButton, ModuleHero } from "@/components/backoffice/dashboard/shared"

const mediaAreas = [
  {
    title: "Portadas editoriales",
    description:
      "Imágenes principales para noticias, artículos y cursos, con versiones optimizadas para escritorio y móvil.",
    folder: "media/cover-images",
  },
  {
    title: "Galería institucional",
    description:
      "Fotografías de actividades, jornadas y vida del centro listas para reutilizar en distintas páginas.",
    folder: "media/gallery",
  },
  {
    title: "Recursos de cursos",
    description:
      "Material visual y descargables vinculados a la oferta formativa, manteniendo orden por programa o edición.",
    folder: "media/courses",
  },
]

export function MediaPanel({ isAdmin }: { isAdmin: boolean }) {
  return (
    <section className="space-y-4">
      <ModuleHero
        badge="Media"
        title="Biblioteca visual y cargas del sitio"
        description="Aquí conviene concentrar imágenes, portadas y recursos de apoyo para que el contenido editorial no dependa de carpetas desordenadas ni de cargas improvisadas."
        actions={
          <LinkButton href="/frontend">
            Revisar cómo se ve en el sitio
          </LinkButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {mediaAreas.map((area, index) => {
          const icons = [ImageIcon, FolderKanban, UploadCloud]
          const Icon = icons[index] ?? ImageIcon

          return (
            <Card
              key={area.title}
              className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
            >
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-[#E05780]">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-xl">{area.title}</CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Carpeta sugerida: <span className="font-medium text-foreground">{area.folder}</span>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-xl">Criterio para subir archivos</CardTitle>
            <CardDescription>
              Una biblioteca bien cuidada evita duplicados, mejora el rendimiento y acelera la publicación.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 p-4">
              Nombrar cada archivo con contexto real: sección, fecha o campaña.
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              Mantener imágenes comprimidas y con dimensiones coherentes antes de publicarlas.
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              Reservar documentos pesados para materiales de cursos o descargas concretas.
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              Revisar periódicamente archivos sin uso para que la biblioteca siga siendo manejable.
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/70 bg-[linear-gradient(145deg,#101828,#172033_58%,#22334f)] text-white shadow-[0_24px_50px_rgba(15,23,42,0.18)]">
          <CardHeader>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-xl">Permisos en media</CardTitle>
            <CardDescription className="text-white/72">
              Acciones recomendadas según el perfil activo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/82">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {isAdmin
                ? "Como administrador puedes ordenar carpetas, reemplazar recursos y depurar archivos que ya no se usan."
                : "Como editor puedes preparar archivos y mantener la biblioteca al día, pero lo ideal es reservar eliminaciones y cambios estructurales para administración."}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Conviene añadir metadatos básicos: tipo de uso, módulo asociado y fecha de actualización.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
