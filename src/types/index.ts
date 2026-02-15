export interface NewsArticle {
  authors: {
    name: string
    socials: {
      x: string
      youtube: string
      instagram: string
      linkedin: string
      mastodon: string
      bluesky: string
    } | null
  }[]
  events: {
    event_id: number
    provider: string
  }[]
  featured: boolean
  id: number
  image_url: string
  launches: {
    launch_id: string
    provider: string
  }[]
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
  results: NewsArticle[]
}

// Blogs use the same structure as articles
export type Blog = NewsArticle;

export interface blogsResponse {
  count: number
  next: string
  previous?: string
  results: Blog[]
}
