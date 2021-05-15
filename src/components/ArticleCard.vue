
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  title: string,
  date: string,
  description?: string
}>()

</script>

<template>
  <div class="article-card-wrapper">
    <div class="title-wrapper">
      <h3>{{ title }}</h3>
      <div class="title-separator" />
      <span>{{ date }}</span>
    </div>
    <div class="snippet-wrapper">
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

.article-card-wrapper {
  display: grid;
  grid-template-columns: 12rem 1fr;
  height: 8rem;
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
      color: red;
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
    padding-left: 2rem;
    overflow: hidden;
    margin: unset;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical; 
    p {
      margin: 0;
    }
  }
}
</style>