import { article } from '@/types'

export const ARTICLES_ENDPOINT = '/articles'

export async function apiGet<T>(endpoint: string) {
  const finalEndpoint = `https://api.spaceflightnewsapi.net/v3${endpoint}` 

  const response = await fetch(finalEndpoint)
  const data = await response.json() as Array<article>

  console.log('data', data);

  return data;
}
