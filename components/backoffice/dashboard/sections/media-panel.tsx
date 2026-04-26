import { CalendarDays, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LinkButton, ModuleHero } from "@/components/backoffice/dashboard/shared"

const planningAreas = [
  {
    title: "Publicaciones",
    description:
      "Planifica noticias, cursos y piezas clave con una fecha clara y un responsable definido.",
    detail: "Define que sale, cuando sale y en que canal.",
  },
  {
    title: "Revisiones",
    description:
      "Agrupa los contenidos que necesitan correccion, validacion o una segunda revision.",
    detail: "Evita publicar textos sin revisar.",
  },
  {
    title: "Seguimiento",
    description:
      "Manten a la vista las tareas abiertas para que el equipo no pierda el hilo.",
    detail: "Ideal para cambios pendientes y cierres semanales.",
  },
]

export function PlanningPanel({ isAdmin }: { isAdmin: boolean }) {
  return (
    <section className="space-y-4">
      <ModuleHero
        badge="Planificacion"
        title="Plan editorial del equipo"
        description="Un espacio mas util para organizar publicaciones, revisiones y tareas del panel."
        actions={
          <LinkButton href="/frontend">
            Ver sitio publico
          </LinkButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {planningAreas.map((area, index) => {
          const icons = [CalendarDays, ClipboardList, CheckCircle2]
          const Icon = icons[index] ?? CalendarDays

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
                {area.detail}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-white/70 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-xl">Criterio de trabajo</CardTitle>
            <CardDescription>
              Un flujo claro reduce errores y agiliza la publicacion.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 p-4">
              Define una prioridad para cada tarea.
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              Marca siempre responsable y fecha.
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              Revisa ortografia y enlaces antes de publicar.
            </div>
            <div className="rounded-2xl border border-border/70 p-4">
              Cierra tareas resueltas para mantener orden.
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/70 bg-[linear-gradient(145deg,#101828,#172033_58%,#22334f)] text-white shadow-[0_24px_50px_rgba(15,23,42,0.18)]">
          <CardHeader>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-xl">Uso del panel</CardTitle>
            <CardDescription className="text-white/72">
              Recomendaciones segun el perfil activo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/82">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {isAdmin
                ? "Como administrador puedes definir prioridades, revisar avances y ordenar el trabajo del equipo."
                : "Como editor puedes preparar contenidos, actualizar tareas y dejar notas claras para la siguiente revision."}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Usa descripciones cortas, fechas visibles y estados simples para que el panel sea facil de mantener.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
