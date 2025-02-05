<script setup>
// 如果需要的话，可以在这里导入全局组件
</script>

<template>
	<div>
		<!-- 导航栏（如果需要的话） -->
		<nav>
			<router-link to="/">Home</router-link> | 
      <router-link to="/about">About</router-link> |
			<router-link to="/users/1">User 1</router-link>
		</nav>

		<!-- 这里是路由视图，会显示当前路由对应的组件 -->
		<router-view />
	</div>
</template>

<style scoped>
/* 你的样式 */
nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
	text-decoration: none;
}

nav a.router-link-active {
	color: #42b983;
}
</style>
