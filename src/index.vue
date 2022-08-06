<template>
	<div id="app">
		<h1 class="title">{{title}}</h1>
		<HelloWorld msg="Welcome to Your Index App" />
	</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { add1, add2, add3, add4, add5, add6, add7, add8, add9 } from '@/utils'

const arr1 = [1, 3, 7, 9]

export default {
	name: 'App',
	components: {
		HelloWorld
	},

	data() {
		return {
			title: '你好world2'
		}
	},
	mounted() {
		this.a = add1(1, 2)
		this.a = add2(1, 2)
		this.a = add3(1, 2)
		this.a = add4(1, 2)
		this.a = add5(1, 2)
		this.a = add6(1, 2)
		this.a = add7(1, 2)
		this.a = add8(1, 2)
		this.a = add9(1, 2)
		this.a = arr1.includes(3) && 2
	}
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
