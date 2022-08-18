<template>
	<div id="app">
		<h1 class="title">{{ title }}</h1>
		<h2>Index App</h2>
	</div>
</template>

<script>
const arr1 = [1, 3, 7, 9]

export default {
	name: 'App',

	data() {
		return {
			a: '测试docker缓存',
			name: '',
		}
	},
	mounted() {
		this.a = arr1.includes(3) && 3
	},
}
</script>

<style scoped lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
.title {
	display: grid;
	align-items: center;
	justify-content: center;
	transform: translateX(20%);
	color: gray;
}
</style>
