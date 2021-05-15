import { defineClientAppEnhance } from '@vuepress/client'
import ArticleCard from '@/components/ArticleCard.vue'

console.log('Article Card', ArticleCard)

export default defineClientAppEnhance(({ app, router, siteData}) => {
  app.component('ArticleCard', ArticleCard)
})

