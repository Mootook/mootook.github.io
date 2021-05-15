import { defineClientAppEnhance } from '@vuepress/client'
import ArticleCard from '@/components/ArticleCard.vue'

export default defineClientAppEnhance(({ app, router, siteData}) => {
  app.component('ArticleCard', ArticleCard)
})

