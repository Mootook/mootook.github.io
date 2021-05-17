<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils'

import type { Router } from 'vue-router'
import type { Blurb } from '@shared/types'
import type { PropType } from 'vue'

const props = defineProps({
  blurb: {
    type: Object as PropType<Blurb>,
    required: true
  }
})

const router: Router = useRouter()
const goToArticle = () => router.push(props.blurb.link)
const formattedDate = computed(() => formatDate(new Date(props.blurb.date)) || '')

</script>

<template>
  <div class="article-card-wrapper">
    <div class="title-wrapper">
      <h3 @click="goToArticle">{{ blurb.title }}</h3>
      <div class="title-separator" />
      <span>{{ formattedDate }}</span>
    </div>
    <div class="snippet-wrapper">
      <p>{{ blurb.description }}</p>
    </div>
  </div>
  <div class="article-separator" />
</template>

<style scoped lang="scss">

.article-card-wrapper {
  display: grid;
  grid-template-columns: 14rem 1fr;
  .title-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem 0 0.5rem;
    h3 {
      padding-bottom: 0.5rem;
      color: $accentColor;
      margin: unset;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      cursor: pointer;
      transition: color 0.25s;
    }
    h3:hover {
      color: $accentColor-hover;
    }
    span {
      font-size: 0.8rem;
    }
    .title-separator {
      height: 1px;
      width: 30%;
      background-color: lightgray;
      margin: 0.5rem 0 0.5rem 0;
    }
  }
  .snippet-wrapper {
    margin: 0 0 1rem 2rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    p {
      margin: 0;
    }
  }
}
.article-separator {
  width: 100%;
  height: 1px;
  margin: 1rem 1rem 1rem 0.5rem;
  background-color: lightgray;
}
</style>
