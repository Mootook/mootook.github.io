import { defineClientAppEnhance } from '@vuepress/client'
import BlurbCard from '@/components/BlurbCard.vue'
import VideoFrame from '@/components/VideoFrame.vue'
import BlurbCardList from '@/components/BlurbCardList.vue'

export default defineClientAppEnhance(({ app, router, siteData}) => {
  app.component('BlurbCard', BlurbCard)
  app.component('VideoFrame', VideoFrame)
  app.component('BlurbCardList', BlurbCardList)
})
