import { defineClientAppEnhance } from '@vuepress/client'
import ArticleCard from '@/components/ArticleCard.vue'
import VideoFrame from '@/components/VideoFrame.vue'
import ArticleList from '@/components/ArticleList.vue'

export default defineClientAppEnhance(({ app, router, siteData}) => {
  app.component('ArticleCard', ArticleCard)
  app.component('VideoFrame', VideoFrame)
  app.component('ArticleList', ArticleList)
})
