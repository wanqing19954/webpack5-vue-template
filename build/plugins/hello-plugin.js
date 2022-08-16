export default class HelloPlugin {
	constructor(options) {}

	apply(compiler) {
		compiler.hooks.done.tap('HelloWorld', (stats) => {
			console.log('资源输出完成 hello world')
		})
	}
}
