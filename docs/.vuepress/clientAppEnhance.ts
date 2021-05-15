import { defineClientAppEnhance } from '@vuepress/client'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineClientAppEnhance(({ app, router, siteData}) => {
  app.component('HelloWorld', HelloWorld)
})

