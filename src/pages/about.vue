<script setup>
import { useHead } from "@vueuse/head";
import { useFetch } from "@vueuse/core";

const { data, isLoading } = useFetch("/api/za/chouq.php", {
	afterFetch(ctx) {
		// 将 JSON 字符串解析为对象
		ctx.data = JSON.parse(ctx.data);
		return ctx;
	},
});

useHead({
	title: "About Page",
	meta: [
		{ name: "description", content: "About page description" },
		{ property: "og:title", content: "About Page" },
		{ property: "og:description", content: "About page description" },
	],
});
</script>

<template>
	<div>
		<h1>About</h1>
        <p v-if="isLoading">Loading...</p>
        <p v-else>{{ data?.data?.source }}</p>
	</div>
</template>
