export type NewsCategory =
  | "All"
  | "Insercion laboral"
  | "Informatica"
  | "LGTBIQ+"
  | "Formacion"
  | "Comunidad"

export type NewsItem = {
  id: string
  title: string
  description: string
  content: string[]
  category: Exclude<NewsCategory, "All">
  image: string
  publishedAt: string
  author: string
  featured?: boolean
}
