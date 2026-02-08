import { article, articlesResponse } from '@/types'

export const ARTICLES_ENDPOINT = '/articles'

export async function apiGet<T>(endpoint: string): Promise<T> {
  const finalEndpoint = `https://api.spaceflightnewsapi.net/v4${endpoint}/?format=json`

  const response = await fetch(finalEndpoint)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json()

  return data as T
}
