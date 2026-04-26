"use client"

import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  BookOpenText,
  FolderKanban,
  Newspaper,
  Settings2,
} from "lucide-react"
import { toast } from "sonner"

import { contentModules } from "@/components/backoffice/dashboard/data"
import { ConfiguracionPanel } from "@/components/backoffice/dashboard/sections/configuracion-panel"
import { ContentPanel } from "@/components/backoffice/dashboard/sections/content-panel"
import { CursosPanel } from "@/components/backoffice/dashboard/sections/cursos-panel"
import { NoticiasPanel } from "@/components/backoffice/dashboard/sections/noticias-panel"
import { PlanningPanel } from "@/components/backoffice/dashboard/sections/media-panel"
import { ResumenPanel } from "@/components/backoffice/dashboard/sections/resumen-panel"
import type {
  ContentSectionKey,
  DashboardMainView,
  SettingsSectionKey,
} from "@/components/backoffice/dashboard/types"
import type { AppRole } from "@/lib/supabase/types"

function getCurrentView(rawView: string | null, isAdmin: boolean): DashboardMainView {
  if (rawView === "noticias") return "noticias"
  if (rawView === "cursos") return "cursos"

  if (rawView === "news" || rawView === "blog" || rawView === "courses") {
    return "content"
  }

  if (rawView === "content" || rawView === "planning") {
    return rawView
  }

  if (rawView === "settings" && isAdmin) {
    return "settings"
  }

  return "dashboard"
}

function getContentSection(
  rawView: string | null,
  rawSection: string | null
): ContentSectionKey {
  if (rawView === "news" || rawView === "blog" || rawView === "courses") {
    return rawView
  }

  if (rawSection === "news" || rawSection === "blog" || rawSection === "courses") {
    return rawSection
  }

  return "news"
}

function getSettingsSection(rawSection: string | null): SettingsSectionKey {
  if (rawSection === "access") {
    return rawSection
  }

  return "general"
}

export function DashboardOverview({ role }: { role: AppRole | null | undefined }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const loginToastShownRef = useRef(false)
  const isAdmin = role === "admin"
  const currentView = getCurrentView(searchParams.get("view"), isAdmin)
  const contentSection = getContentSection(
    searchParams.get("view"),
    searchParams.get("section") ?? searchParams.get("module")
  )
  const settingsSection = getSettingsSection(searchParams.get("section"))

  const selectedContentModule =
    contentModules.find((module) => module.id === contentSection) ?? contentModules[0]

  useEffect(() => {
    if (
      searchParams.get("auth") !== "signed-in" ||
      loginToastShownRef.current
    ) {
      return
    }

    loginToastShownRef.current = true
    toast.success("Sesión iniciada correctamente.")

    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.delete("auth")
    const nextQuery = nextParams.toString()

    router.replace(
      nextQuery ? `/backend/backoffice/panel?${nextQuery}` : "/backend/backoffice/panel"
    )
  }, [router, searchParams])

  const statCards = isAdmin
    ? [
        {
          label: "Modulos editoriales",
          value: `${contentModules.length}`,
          helper: "Noticias, blog y cursos con gestion separada.",
          icon: Newspaper,
        },
        {
          label: "Bloques de trabajo",
          value: "03",
          helper: "Resumen, contenido y planificacion en un solo panel.",
          icon: FolderKanban,
        },
        {
          label: "Control",
          value: "02",
          helper: "Configuracion y accesos para la gestion general.",
          icon: Settings2,
        },
      ]
    : [
        {
          label: "Flujos editoriales",
          value: `${contentModules.length}`,
          helper: "Noticias, blog y cursos con rutas claras.",
          icon: Newspaper,
        },
        {
          label: "Plan semanal",
          value: "01",
          helper: "Vista rapida de tareas y publicaciones pendientes.",
          icon: FolderKanban,
        },
        {
          label: "Piezas clave",
          value: "03",
          helper: "Tres areas principales para publicar contenido.",
          icon: BookOpenText,
        },
      ]

  const viewContent = {
    dashboard: <ResumenPanel statCards={statCards} isAdmin={isAdmin} />,
    noticias: <NoticiasPanel />,
    cursos: <CursosPanel />,
    content: (
      <ContentPanel
        modules={contentModules}
        selectedModule={selectedContentModule}
        isAdmin={isAdmin}
      />
    ),
    planning: <PlanningPanel isAdmin={isAdmin} />,
    settings: isAdmin ? (
      <ConfiguracionPanel selectedSection={settingsSection} />
    ) : (
      <ResumenPanel statCards={statCards} isAdmin={isAdmin} />
    ),
  } satisfies Record<DashboardMainView, React.ReactNode>

  return <div className="space-y-6">{viewContent[currentView]}</div>
}
