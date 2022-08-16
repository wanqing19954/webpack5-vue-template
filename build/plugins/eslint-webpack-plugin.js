class EslintWebpackPlugin {
	constructor(options = {}) {}

	apply(compiler) {
		compiler.hooks.run.tapPromise(this.key, (c) => this.run(c, options, wanted, exclude))
	}

	async run(compiler, options, wanted, exclude) {
		compiler.hooks.compilation.tap(this.key, (compilation) => {
			;({ lint, report, threads } = linter(this.key, options, compilation))

			const files = []

			// 单个模块成功编译后触发
			compilation.hooks.succeedModule.tap(this.key, ({ resource }) => {
				// 判断是否需要检查该文件
				if (
					isMatch(file, wanted, { dot: true }) &&
					!isMatch(file, exclude, { dot: true })
				) {
					lint(file)
				}
			})

			// 所有模块构建完毕后触发
			compilation.hooks.finishModules.tap(this.key, () => {
				if (files.length > 0 && threads <= 1) {
					lint(files)
				}
			})

			// 等待检查结果
			compilation.hooks.additionalAssets.tapPromise(this.key, processResults)

			async function processResults() {}
		})
	}
}
