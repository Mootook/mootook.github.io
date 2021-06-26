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
  <div class="blurb-wrapper" @click="goToArticle">
    <img :src="blurb.thumbnail" />
    <div class="content-wrapper">
      <h3>{{ blurb.title }}</h3>
      <div class="date-wrapper">
        <div class="title-separator leading" />
        <span>{{ formattedDate }}</span>
        <div class="title-separator" />
      </div>
      <div class="snippet-wrapper">
        <p>{{ blurb.description }}</p>
      </div>
    </div>
  </div>
  <div class="article-separator" />
</template>

<style scoped lang="scss">

@mixin truncate-text($line-count: 1) {
  display: -webkit-box;
  /** overflow */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

$vertical-spacing: 0.5rem;

.blurb-wrapper {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 14rem 1fr;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover; // spreads to full space of tag
    opacity: 1;
    pointer-events: none; // removes vuepress default behavior
    transition: all 0.25s;
  }
  &:hover {
    .content-wrapper {
      h3 {
        color: var(--c-brand-light);
      }
    }
  }
  .content-wrapper {
    padding-left: 1rem;
    display: grid;
    grid-template-rows: auto 1.25rem 1fr;
    h3 {
      text-align: left;
      @include truncate-text(2);
      word-break: break-word;
      color: var(--c-brand);
      margin: 0 0 $vertical-spacing 0;
      cursor: pointer;
      transition: color 0.25s;
    }
  }
  .date-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      font-style: italic;
      margin: 0 0.5rem 0 0.5rem;
      font-size: 0.8rem;
    }
    .title-separator {
      height: 1px;
      width: 20%;
      background-color: lightgray;
      &.leading {
        width: 2rem;
      }
    }
  }
  .snippet-wrapper {
    margin: $vertical-spacing 0;
    p {
      margin: unset;
      @include truncate-text(2);
    }
  }

  @media only screen and (max-width: 600px) {
    img {
      display: none;
    }
    grid-template-columns: 1fr;
    .content-wrapper {
      padding-left: 0;
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
