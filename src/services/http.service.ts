import { NewsArticle, Blog, blogsResponse } from '@/types'

export const ARTICLES_ENDPOINT = '/articles'

export async function apiGet<T>(endpoint: string, limit: number = 10, offset: number = 0): Promise<T> {
  const finalEndpoint = `https://api.spaceflightnewsapi.net/v4${endpoint}/?limit=${limit}&offset=${offset}&format=json`

  const response = await fetch(finalEndpoint)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json()

  return data as T
}

export async function getArticle(id: number): Promise<NewsArticle> {
  return apiGet<NewsArticle>(`${ARTICLES_ENDPOINT}/${id}`)
}

export const BLOGS_ENDPOINT = '/blogs'

export async function getBlogs(): Promise<blogsResponse> {
  return apiGet<blogsResponse>(BLOGS_ENDPOINT)
}

export async function getBlog(id: number): Promise<Blog> {
  return apiGet<Blog>(`${BLOGS_ENDPOINT}/${id}`)
}
