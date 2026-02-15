<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getBlog } from '@/services/http.service'
import type { Blog } from '@/types'

const route = useRoute()
const blogData = ref<Blog | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const formattedAuthors = computed(() => {
  if (!blogData.value?.authors || blogData.value.authors.length === 0) return ''
  return blogData.value.authors.map(a => a.name).join(', ')
})

const allSocials = computed(() => {
  if (!blogData.value?.authors) return []
  const socials = []
  for (const author of blogData.value.authors) {
     if (author.socials) {
       for (const [platform, link] of Object.entries(author.socials)) {
         if (link) {
           socials.push({ platform, link })
         }
       }
     }
  }
  return socials
})

onMounted(async () => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    error.value = 'Invalid blog ID'
    loading.value = false
    return
  }

  try {
    blogData.value = await getBlog(id)
  } catch (e) {
    error.value = 'Failed to load blog'
    console.error(e)
  } finally {
    loading.value = false
    }
})

const socialIcons: Record<string, string> = {
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  mastodon: 'M23.193 9.463c-.157-1.096-.289-2.193-.538-3.237-1.026-4.29-4.71-4.735-4.71-4.735C15.111.411 12 .397 12 .397h-.032s-3.111.014-5.945 1.094c0 0-3.684.445-4.71 4.735-.25 1.044-.381 2.141-.539 3.237C.335 12.607.309 15.6.589 18.577c.4 4.242 4.908 4.498 4.908 4.498 2.296.223 4.282-.128 4.282-.128l-.053-1.92s-1.468.169-2.822-.058c-1.94-.325-2.112-2.316-2.147-2.793.92.518 5.659 1.545 13.048.293.085-.12.147-.282.147-.282.855-3.376.621-6.108.239-8.724zm-6.059 5.86H15.17v-4.66c0-1.503-.526-2.484-1.541-2.484-1.286 0-1.896.966-1.896 2.502v3.666h-3.468V10.68c0-1.536-.61-2.502-1.896-2.502-1.015 0-1.541.981-1.541 2.484v4.66H2.863V10.37c0-2.43 1.015-4.218 3.167-4.218 1.636 0 2.81 1.066 3.193 2.658L12 11.835l2.777-3.025c.383-1.592 1.557-2.658 3.193-2.658 2.152 0 3.167 1.788 3.167 4.218v4.953z',
  bluesky: 'M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.378 3.496-2.418.434-3.969 1.4-4.533 2.418 C-1.164 21.063 5 24 5 24c4.665.485 7-1.171 7-4.634C12 22.829 14.335 24.485 19 24c0 0 6.165-2.937 2.532-7.84-.564-1.018-2.115-1.984-4.533-2.418 2.665.164 5.563-.76 6.379-3.496.246-.829.624-5.79.624-6.479 0-.689-.139-1.86-.903-2.203-.659-.3-1.664-.62-4.301 1.24C16.046 4.748 13.087 8.687 12 10.8z'
}

</script>

<template>
  <div class="article-slug">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="blogData" class="content">
      <img :src="blogData.image_url" :alt="blogData.title" class="hero-image" />
      <div class="back-link-container">
        <router-link to="/blogs#blogsSection" class="back-link">← Back to Blogs</router-link>
      </div>
      <h1>{{ blogData.title }}</h1>
      <div class="meta">
        <span class="date">{{ new Date(blogData.published_at).toLocaleDateString() }}</span>
        <span v-if="formattedAuthors" class="authors-meta">
          By <span class="author-name">{{ formattedAuthors }}</span>
        </span>
        <span class="site">{{ blogData.news_site }}</span>

        <div v-if="allSocials.length" class="meta-socials">
           <span v-for="(item, index) in allSocials" :key="index">
              <a
                v-if="item.link && socialIcons[item.platform]"
                :href="item.link"
                target="_blank"
                class="social-link"
                :title="item.platform"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path :d="socialIcons[item.platform]" />
                </svg>
              </a>
           </span>
        </div>
      </div>



      <p class="summary">{{ blogData.summary }}</p>

      <div class="actions">
        <a :href="blogData.url" target="_blank" class="read-more">Read Full Blog</a>
      </div>

       <div v-if="blogData.launches && blogData.launches.length">
        <h3>Launches</h3>
        <ul>
            <li v-for="launch in blogData.launches" :key="launch.launch_id">
                {{ launch.provider }}
            </li>
        </ul>
      </div>

       <div v-if="blogData.events && blogData.events.length">
        <h3>Events</h3>
        <ul>
            <li v-for="event in blogData.events" :key="event.event_id">
                {{ event.provider }}
            </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
.article-slug {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
  color: #333;
}

.author-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.author-item:last-child {
  border-bottom: none;
}


.loading, .error {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
}

.error {
  color: #d32f2f;
}

.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.back-link-container {
  margin-bottom: 20px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: #007bff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
  background: rgba(0, 123, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
}

.back-link:hover {
  color: #0056b3;
  background: rgba(0, 123, 255, 0.2);
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 15px;
  line-height: 1.2;
  color: #fff;
  letter-spacing: -0.02em;
}

.meta {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #666;
  margin-bottom: 30px;
  font-size: 0.95rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.site {
  font-weight: 600;
  color: #007bff;
  background: #e3f2fd;
  padding: 4px 12px;
  border-radius: 20px;
}

.meta-socials {
  margin-left: auto;
  display: flex;
  gap: 12px;
  align-items: center;
}

.social-link {
  color: #555;
  transition: color 0.2s;
  display: flex;
}

.social-link:hover {
  color: #007bff;
}

.date {
  color: #888;
}

.authors-meta {
  color: #666;
}

.author-name {
  font-weight: 600;
  color: #007bff;
}

.summary {
  font-size: 1.25rem;
  line-height: 1.7;
  color: #444;
  margin-bottom: 40px;
  font-weight: 400;
}

.launches, .events {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #222;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
  display: inline-block;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.author-item { /* Added class in template update below if needed, but for now generic li */
  font-weight: 500;
}



.actions {
  display: flex;
  justify-content: center;
  margin: 50px 0;
}

.read-more {
  display: inline-block;
  padding: 14px 28px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 118, 255, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.read-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 118, 255, 0.4);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .hero-image {
    height: 250px;
  }
}
</style>
