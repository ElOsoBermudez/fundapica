export type DashboardMainView = "dashboard" | "noticias" | "cursos" | "content" | "media" | "settings"

export type ContentSectionKey = "news" | "blog" | "courses"

export type SettingsSectionKey = "general" | "access"

export type ContentModule = {
  id: string
  title: string
  description: string
  action: string
  summary: string
  focus: string
  workflow: string[]
  publicHref: string
}
