<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{ videoUrl: string }>()

</script>

<template>
  <div class="video-wrapper">
    <iframe
      :src="videoUrl"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;

  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
  }
}
</style>
