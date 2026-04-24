export type NewsItem = {
  id: string
  title: string
  title_ca: string | null
  description: string
  description_ca: string | null
  content: string
  content_ca: string | null
  category: string
  image: string | null
  publishedAt: string
  author: string
  featured?: boolean
}
