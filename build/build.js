import { distDir, getBaseConfig } from './base.js'
import { merge } from 'webpack-merge'
import webpack from 'webpack'
import { formatStats } from './utils/formatStatus.js'
import { done, info, log } from './utils/logger.js'
import chalk from 'chalk'

const baseconfig = getBaseConfig(true)

const prodConfig = merge(baseconfig, {
	mode: 'production'
})
webpack(prodConfig, (err, stats) => {
	if (err) {
		throw err
	}
	if (stats.hasErrors()) {
		console.log('stats', stats)
		throw new Error('Build failed with errors.')
	}

	log(formatStats(stats, distDir))

	done(`Build complete. The dist directory is ready to be deployed.`)

	info(
		`Check out deployment instructions at ${chalk.cyan(
			`https://cli.vuejs.org/guide/deployment.html`
		)}\n`
	)

	console.log('Build complete.')
})
