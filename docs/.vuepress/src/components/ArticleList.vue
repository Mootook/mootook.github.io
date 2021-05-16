<script setup lang="ts">
import { defineProps, computed } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'

import type { Directory } from '@shared/types'
import directoryJSON from '@temp/directory.json'
const directory: Directory = directoryJSON

const props = defineProps<{
  category: string,
}>()

const articleBlurbs = computed(() => directory[props.category] || [])

</script>

<template>
  <div class="list-wrapper">
    <ArticleCard v-for="blurb in articleBlurbs" :blurb="blurb" />
  </div>
</template>

<style lang="scss">
.list-wrapper {
  padding-top: 1rem;
}
</style>