import { getBaseConfig, publicDir, root } from './base.js'
import { merge } from 'webpack-merge'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import chalk from 'chalk'
import { GREEN } from './constant/index.js'
import address from 'address'

const baseconfig = getBaseConfig()

const devConfig = merge(baseconfig, {
	devtool: 'eval-cheap-module-source-map',
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		static: {
			directory: publicDir
		},
		compress: true,
		client: {
			logging: 'none',
			overlay: { warnings: false, errors: true },
			progress: true
		}
	}
})

const compiler = webpack(devConfig)

const devServerOptions = { ...devConfig.devServer, open: true }

const server = new WebpackDevServer(devServerOptions, compiler)

// const getCircularReplacer = () => {
// 	const seen = new WeakSet()
// 	return (key, value) => {
// 		if (typeof value === 'object' && value !== null) {
// 			if (seen.has(value)) {
// 				return
// 			}
// 			seen.add(value)
// 		}
// 		return value
// 	}
// }

function logServerInfo(port) {
	const local = `http://localhost:${port}/`
	const network = `http://${address.ip()}:${port}/`

	console.log('\n  Site running at:\n')
	console.log(`  ${chalk.bold('Local')}:    ${chalk.hex(GREEN)(local)} `)
	console.log(`  ${chalk.bold('Network')}:  ${chalk.hex(GREEN)(network)}`)
}

const runServer = async () => {
	console.log('Starting server...')
	await server.start()
	const port = server.options.port
	logServerInfo(port)
}

runServer()
