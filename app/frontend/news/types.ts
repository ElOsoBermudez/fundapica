export type NewsItem = {
  id: string
  title: string
  description: string
  content: string
  category: string
  image: string | null
  publishedAt: string
  author: string
  featured?: boolean
}
