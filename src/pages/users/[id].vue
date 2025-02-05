<template>
    <h1>User {{ id }}</h1>
</template>

<script setup>
import { useRoute } from 'vue-router'

const { id } = useRoute().params
</script>

