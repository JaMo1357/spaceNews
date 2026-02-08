export interface article {
  authors: { name: string; socials: string | null }[]
  events: any[]
  featured: boolean
  id: number
  image_url: string
  launches: any[]
  news_site: string
  published_at: string
  summary: string
  title: string
  updated_at: string
  url: string
}

export interface articlesResponse {
  count: number
  next: string
  previous?: string
  results: article[]
}
