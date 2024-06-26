import { defineConfig } from '@rsbuild/core'
import { pluginVue2 } from '@rsbuild/plugin-vue2'
import { pluginSass } from '@rsbuild/plugin-sass'

export default defineConfig({
	html: {
		template: './public/index.html',
	},
	source: {
		entry: {
			index: './src/main.ts',
		},
	},
	plugins: [pluginVue2(), pluginSass()],
})
