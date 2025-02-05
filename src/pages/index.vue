<script setup>
import { useHead } from '@vueuse/head'
import { useFetch } from '@vueuse/core'

useHead({
  title: 'Home Page',
  meta: [
    { name: 'description', content: 'Home page description' },
    { property: 'og:title', content: 'Home Page' },
    { property: 'og:description', content: 'Home page description' },
  ]
})
</script>

<template>
  <div>
    <h1 class="text-red-500">Hello World</h1>
    <img src="https://picsum.photos/200/300" alt="Random Image"/>
  </div>
</template>
