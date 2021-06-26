<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BlurbCard from '@/components/BlurbCard.vue'

import type { Directory } from '@shared/types'
import directoryJSON from '@temp/directory.json'
const directory: Directory = directoryJSON

const props = defineProps<{
  category: string,
}>()

const articleBlurbs = computed(() =>{
  const blurbs = directory[props.category] || []
  // get most recent first
  return blurbs.sort((a, b) => {
    const aDate = Date.parse(a.date)
    const bDate = Date.parse(b.date)
    if (!aDate || !bDate) return 0
    if (aDate < bDate) return  1
    if (aDate > bDate) return -1
    return 0
  })
})


</script>

<template>
  <div class="list-wrapper">
    <BlurbCard v-for="blurb in articleBlurbs" :key="blurb.title" :blurb="blurb" />
  </div>
</template>

<style lang="scss">
.list-wrapper {
  padding-top: 1rem;
}
</style>