import { defineClientAppEnhance } from '@vuepress/client'
import BlurbCard from '@/components/BlurbCard.vue'
import BlurbCardList from '@/components/BlurbCardList.vue'
import VideoFrame from '@/components/VideoFrame.vue'


export default defineClientAppEnhance(({ app, router, siteData}) => {
  app.component('BlurbCard', BlurbCard)
  app.component('VideoFrame', VideoFrame)
  app.component('BlurbCardList', BlurbCardList)
})
