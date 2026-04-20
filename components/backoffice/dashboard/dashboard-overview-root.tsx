"use client"

import { useSearchParams } from "next/navigation"
import {
  BookOpenText,
  FolderKanban,
  Newspaper,
  Settings2,
} from "lucide-react"

import { contentModules } from "@/components/backoffice/dashboard/data"
import { ResumenPanel } from "@/components/backoffice/dashboard/sections/resumen-panel"
import { ContentPanel } from "@/components/backoffice/dashboard/sections/content-panel"
import { MediaPanel } from "@/components/backoffice/dashboard/sections/media-panel"
import { ConfiguracionPanel } from "@/components/backoffice/dashboard/sections/configuracion-panel"
import type {
  ContentSectionKey,
  DashboardMainView,
  SettingsSectionKey,
} from "@/components/backoffice/dashboard/types"
import type { AppRole } from "@/lib/supabase/types"

function getCurrentView(rawView: string | null, isAdmin: boolean): DashboardMainView {
  if (rawView === "news" || rawView === "blog" || rawView === "courses") {
    return "content"
  }

  if (rawView === "content" || rawView === "media") {
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
  const searchParams = useSearchParams()
  const isAdmin = role === "admin"
  const currentView = getCurrentView(searchParams.get("view"), isAdmin)
  const contentSection = getContentSection(
    searchParams.get("view"),
    searchParams.get("section") ?? searchParams.get("module")
  )
  const settingsSection = getSettingsSection(searchParams.get("section"))

  const selectedContentModule =
    contentModules.find((module) => module.id === contentSection) ?? contentModules[0]

  const statCards = isAdmin
    ? [
        {
          label: "Módulos editoriales",
          value: `${contentModules.length}`,
          helper: "Noticias, blog y cursos con identidad propia dentro del panel.",
          icon: Newspaper,
        },
        {
          label: "Áreas de media",
          value: "03",
          helper: "Biblioteca preparada para portadas, galerías y recursos de cursos.",
          icon: FolderKanban,
        },
        {
          label: "Bloques de control",
          value: "02",
          helper: "Configuración y acceso reservados para decisiones globales del sitio.",
          icon: Settings2,
        },
      ]
    : [
        {
          label: "Flujos editoriales",
          value: `${contentModules.length}`,
          helper: "Rutas claras para mantener noticias, blog y cursos sin dispersión.",
          icon: Newspaper,
        },
        {
          label: "Biblioteca media",
          value: "01",
          helper: "Un único punto para preparar imágenes y recursos antes de publicar.",
          icon: FolderKanban,
        },
        {
          label: "Piezas clave",
          value: "03",
          helper: "Noticias, artículos y cursos con enfoque editorial definido.",
          icon: BookOpenText,
        },
      ]

  const viewContent = {
    dashboard: <ResumenPanel statCards={statCards} isAdmin={isAdmin} />,
    content: (
      <ContentPanel
        modules={contentModules}
        selectedModule={selectedContentModule}
        isAdmin={isAdmin}
      />
    ),
    media: <MediaPanel isAdmin={isAdmin} />,
    settings: isAdmin ? (
      <ConfiguracionPanel selectedSection={settingsSection} />
    ) : (
      <ResumenPanel statCards={statCards} isAdmin={isAdmin} />
    ),
  } satisfies Record<DashboardMainView, React.ReactNode>

  return <div className="space-y-6">{viewContent[currentView]}</div>
}
