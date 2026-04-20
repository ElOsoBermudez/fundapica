import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ModuleHero } from "@/components/backoffice/dashboard/shared"
import { ConfiguracionGeneralPanel } from "@/components/backoffice/dashboard/sections/configuracion/general-panel"
import { PermisosPanel } from "@/components/backoffice/dashboard/sections/configuracion/permisos-panel"
import type { SettingsSectionKey } from "@/components/backoffice/dashboard/types"

type ConfiguracionPanelProps = {
  selectedSection: SettingsSectionKey
}

const configSections: Array<{
  key: SettingsSectionKey
  label: string
  description: string
}> = [
  {
    key: "general",
    label: "General",
    description: "Ajustes estructurales del sitio",
  },
  {
    key: "access",
    label: "Acceso",
    description: "Roles, permisos y control del panel",
  },
]

export function ConfiguracionPanel({ selectedSection }: ConfiguracionPanelProps) {
  const sectionContent = {
    general: <ConfiguracionGeneralPanel />,
    access: <PermisosPanel />,
  } satisfies Record<SettingsSectionKey, React.ReactNode>

  return (
    <section className="space-y-4">
      <ModuleHero
        badge="Configuración"
        title="Configuración del backoffice"
        description="Aquí quedan agrupadas las decisiones globales del sitio y las reglas de acceso del panel para que la parte editorial no se mezcle con la configuración sensible."
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {configSections.map((section) => {
          const active = section.key === selectedSection

          return (
            <Link
              key={section.key}
              href={`/backend/backoffice/panel?view=settings&section=${section.key}`}
              className={buttonVariants({
                variant: active ? "default" : "outline",
                className: cn(
                  "h-auto min-h-20 flex-col items-start rounded-2xl px-4 py-4 text-left",
                  active ? "bg-[#E05780] text-white hover:bg-[#d14a74]" : ""
                ),
              })}
            >
              <span className="text-sm font-semibold">{section.label}</span>
              <span
                className={cn(
                  "text-xs",
                  active ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {section.description}
              </span>
            </Link>
          )
        })}
      </div>

      {sectionContent[selectedSection]}
    </section>
  )
}
