import { defineClientAppEnhance } from '@vuepress/client'
import ArticleCard from '@/components/ArticleCard.vue'
import VideoFrame from '@/components/VideoFrame.vue'

export default defineClientAppEnhance(({ app, router, siteData}) => {
  app.component('ArticleCard', ArticleCard)
  app.component('VideoFrame', VideoFrame)
})
