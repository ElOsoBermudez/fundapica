import { CheckCircle2, Lock, Users } from "lucide-react"

import { ModuleHero, InfoCard } from "@/components/backoffice/dashboard/shared"

export function PermisosPanel() {
  return (
    <section className="space-y-4">
      <ModuleHero
        badge="Acceso"
        title="Control de acceso y permisos"
        description="Dos perfiles bien definidos bastan para mantener el panel claro y seguro."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <InfoCard
          icon={<Lock className="size-5" />}
          title="Administrador"
          description="Acceso completo a contenido, planificacion, configuracion y decisiones del sitio."
        />
        <InfoCard
          icon={<Users className="size-5" />}
          title="Usuario editor"
          description="Puede preparar noticias, blog, cursos y tareas editoriales sin tocar ajustes sensibles."
        />
        <InfoCard
          icon={<CheckCircle2 className="size-5" />}
          title="Regla recomendada"
          description="Si una accion cambia la estructura del sitio, conviene reservarla al rol administrador."
        />
      </div>
    </section>
  )
}
