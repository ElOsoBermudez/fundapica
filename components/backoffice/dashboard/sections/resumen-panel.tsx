import {
  BookOpenText,
  FolderKanban,
  Globe2,
  Newspaper,
  Settings2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LinkButton } from "@/components/backoffice/dashboard/shared"

type SummaryStat = {
  label: string
  value: string
  helper: string
  icon: typeof Newspaper
}

export function ResumenPanel({
  statCards,
  isAdmin,
}: {
  statCards: SummaryStat[]
  isAdmin: boolean
}) {
  const priorities = isAdmin
    ? [
        "Revisar borradores antes de publicar para mantener un criterio editorial estable.",
        "Ordenar la biblioteca visual y conectar cada pieza con su módulo correspondiente.",
        "Actualizar ajustes globales del sitio cuando cambien campañas, textos clave o enlaces institucionales.",
      ]
    : [
        "Dejar noticias y artículos listos para revisión con textos cerrados e imagen principal definida.",
        "Subir recursos visuales con nombres claros para que el panel siga siendo fácil de mantener.",
        "Mantener los cursos al día con información completa, breve y orientada a la acción.",
      ]

  const areaCards = [
    {
      title: "Noticias",
      description:
        "Publicaciones breves para comunicar actividades, avisos y novedades del centro con ritmo constante.",
      icon: Newspaper,
      href: "/backend/backoffice/panel?view=content&section=news",
    },
    {
      title: "Blog",
      description:
        "Piezas más desarrolladas para reforzar la identidad editorial y compartir contenido de valor.",
      icon: BookOpenText,
      href: "/backend/backoffice/panel?view=content&section=blog",
    },
    {
      title: "Media",
      description:
        "Biblioteca visual organizada para portadas, galerías y recursos vinculados a cursos o campañas.",
      icon: FolderKanban,
      href: "/backend/backoffice/panel?view=media",
    },
  ]

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <Card className="border-white/70 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <CardHeader className="gap-3">
            <div className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#E05780]">
              Resumen operativo
            </div>
            <CardTitle className="text-2xl sm:text-3xl">
              Centro editorial y operativo de Fundapica
            </CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6 sm:text-base">
              Desde aquí se coordinan las piezas públicas del sitio, la biblioteca
              media y los ajustes que sostienen el trabajo del equipo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row">
            <LinkButton href="/backend/backoffice/panel?view=content&section=news">
              <Newspaper />
              Ir a Contenido
            </LinkButton>
            <LinkButton href="/backend/backoffice/panel?view=media">
              <FolderKanban />
              Abrir Media
            </LinkButton>
            {isAdmin ? (
              <LinkButton href="/backend/backoffice/panel?view=settings&section=general">
                <Settings2 />
                Revisar Configuración
              </LinkButton>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-white/70 bg-[linear-gradient(145deg,#101828,#172033_55%,#1f2d45)] text-white shadow-[0_24px_50px_rgba(15,23,42,0.18)]">
          <CardHeader>
            <CardTitle className="text-xl">Modo de trabajo activo</CardTitle>
            <CardDescription className="text-white/70">
              {isAdmin
                ? "Tienes acceso completo a contenido, media y configuración."
                : "Tienes acceso editorial a contenido y biblioteca media."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/80">
            {priorities.map((priority) => (
              <div
                key={priority}
                className="rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                {priority}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {statCards.map((item) => (
          <Card
            key={item.label}
            className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
          >
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <CardDescription>{item.label}</CardDescription>
                <CardTitle className="mt-3 text-3xl">{item.value}</CardTitle>
              </div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-[#E05780]">
                <item.icon className="size-5" />
              </span>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {item.helper}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-xl">Áreas listas para trabajar</CardTitle>
            <CardDescription>
              Accesos pensados para entrar rápido en el flujo que más se usa dentro del panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {areaCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-border/70 bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-[#E05780]">
                    <item.icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <LinkButton href={item.href}>
                    Entrar en {item.title}
                  </LinkButton>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-xl">Criterio editorial del panel</CardTitle>
            <CardDescription>
              Tres reglas sencillas para que el backoffice se sienta ordenado y profesional desde el primer día.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-border/70 p-4">
              1. Cada módulo debe responder a una tarea concreta: informar, profundizar o presentar la oferta formativa.
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              2. La biblioteca media debe alimentar al contenido, no convertirse en un almacén sin criterio.
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              3. La configuración solo debe concentrar decisiones globales, nunca mezclar trabajo editorial diario.
            </div>
            <div className="rounded-2xl border border-dashed border-border/70 p-4">
              <div className="flex items-start gap-3">
                <Globe2 className="mt-0.5 size-5 shrink-0 text-[#E05780]" />
                <p>
                  Antes de publicar, conviene revisar cómo respira cada pieza en el sitio público: jerarquía, imagen y claridad del mensaje.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
