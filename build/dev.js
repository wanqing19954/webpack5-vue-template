import { getBaseConfig, publicDir } from './base.js'
import { merge } from 'webpack-merge'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'

const baseconfig = getBaseConfig()

const devConfig = merge(baseconfig, {
	mode: 'development',
	devServer: {
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

const runServer = async () => {
	console.log('Starting server...')
	server.showStatus = () => {}
	await server.start()
}

runServer()
