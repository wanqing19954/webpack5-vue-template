import { getBaseConfig, publicDir } from './base.js'
import { merge } from 'webpack-merge'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import { getPort } from 'portfinder'
import chalk from 'chalk'
import address from 'address'
import { GREEN } from './constant/index.js'

const baseconfig = getBaseConfig()

const devConfig = merge(baseconfig, {
	mode: 'development',
	devServer: {
		static: {
			directory: publicDir
		},
		port: 8080,
		quiet: true,
		host: '0.0.0.0',
		stats: 'errors-only',
		publicPath: '/',
		disableHostCheck: true
	}
})

getPort(
	{
		port: devConfig.devServer.port
	},
	(err, port) => {
		if (err) {
			console.log(err)
			return
		}

		logServerInfo()
		runDevServer(port, devConfig)
	}
)

function logServerInfo(port) {
	const local = `http://localhost:${port}/`
	const network = `http://${address.ip()}:${port}/`

	console.log('\n  Site running at:\n')
	console.log(`  ${chalk.bold('Local')}:    ${chalk.hex(GREEN)(local)} `)
	console.log(`  ${chalk.bold('Network')}:  ${chalk.hex(GREEN)(network)}`)
}

async function runDevServer(port, config) {
	const compiler = webpack(config)
	const server = new WebpackDevServer(
		{
			...config.devServer,
			port
		},
		compiler
	)

	// this is a hack to disable wds status log
	server.showStatus = function () {}

	await server.start()
}
