import { CheckCircle2, Lock, Users } from "lucide-react"

import { ModuleHero, InfoCard } from "@/components/backoffice/dashboard/shared"

export function PermisosPanel() {
  return (
    <section className="space-y-4">
      <ModuleHero
        badge="Acceso"
        title="Control de acceso y criterio de permisos"
        description="Con dos perfiles bien definidos puedes mantener el panel simple: administración para decisiones globales y edición para el trabajo diario de contenidos."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <InfoCard
          icon={<Lock className="size-5" />}
          title="Administrador"
          description="Acceso completo a contenido, media, configuración y decisiones que afectan a la estructura general del sitio."
        />
        <InfoCard
          icon={<Users className="size-5" />}
          title="Usuario editor"
          description="Entra al panel para preparar noticias, blog, cursos y recursos visuales sin tocar la configuración sensible."
        />
        <InfoCard
          icon={<CheckCircle2 className="size-5" />}
          title="Regla recomendada"
          description="Si una acción cambia la estructura del sitio, debería quedar reservada al rol administrador."
        />
      </div>
    </section>
  )
}
