import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { VueLoaderPlugin } from 'vue-loader'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import WebpackBar from 'webpackbar'
import { done, info, log } from './utils/logger.js'
import chalk from 'chalk'
import { formatStats } from './utils/formatStatus.js'

const { DefinePlugin } = webpack
const _dirname = fileURLToPath(import.meta.url)

const isProd = process.env.NODE_ENV === 'production'

const root = path.resolve(_dirname, '..', '..')
const srcDir = path.resolve(root, 'src')
const distDir = path.resolve(root, 'dist')

const webpackConfig = {
	mode: 'production',
	entry: {
		app: ['./src/main.js']
	},
	output: {
		path: distDir,
		filename: 'js/[name].[contenthash:8].js',
		chunkFilename: 'js/[name].[contenthash:8].js',
		publicPath: '/',
	},
	resolve: {
		alias: {
			'@': srcDir,
			vue$: 'vue/dist/vue.runtime.esm.js'
		},
		extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm']
	},
	module: {
		noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							compilerOptions: {
								whitespace: 'condense'
							}
						}
					}
				]
			},
			{
				test: /\.vue$/,
				resourceQuery: /type=style/,
				sideEffects: true
			},
			{
				test: /\.m?jsx?$/,
				use: [
					{
						loader: 'babel-loader',
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
				type: 'asset',
				generator: {
					filename: 'img/[name].[hash:8][ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				type: 'asset',
				generator: {
					filename: 'fonts/[name].[hash:8][ext]'
				}
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			},
			{
				test: /\.s(a|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			}
		]
	},
	optimization: {
		realContentHash: false,
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					name: 'chunk-vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial'
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			},
			minSize: 0
		},
		minimizer: isProd
			? [
					new TerserPlugin({
						terserOptions: {},
						parallel: true,
						extractComments: false
					}),
					// optimize-css-asset-webpack-plugin优化版，支持缓存和并行模式
					new CssMinimizerPlugin({
						parallel: true,
						minimizerOptions: {
							preset: [
								'default',
								{
									mergeLonghand: false,
									cssDeclarationSorter: false
								}
							]
						}
					})
			  ]
			: false
	},
	plugins: [
		new CleanWebpackPlugin(),
		new WebpackBar(),
		new VueLoaderPlugin(),
		new DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
				BASE_URL: '"/"'
			}
		}),

		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}),

		new HtmlWebpackPlugin({
			title: 'Index Page',
			scriptLoading: 'defer',
			chunks: ['chunk-vendors', 'chunk-common', 'app'],
			template: 'public/index.html',
			filename: 'index.html'
		}),

		new CaseSensitivePathsPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(root, 'public'),
					to: path.resolve(root, 'dist'),
					toType: 'dir',
					noErrorOnMissing: true,
					globOptions: {
						ignore: ['**/.DS_Store', path.resolve(root, 'public/index.html')]
					},
					info: {
						minimized: true
					}
				}
			]
		})
	]
}

webpack(webpackConfig, (err, stats) => {
	if (err) {
		throw(err)
	}
	if (stats.hasErrors()) {
		console.log('stats', stats)
		throw new Error('Build failed with errors.')
	}
	if (isProd) {
		log(formatStats(stats, distDir))

		done(`Build complete. The dist directory is ready to be deployed.`)

		info(
			`Check out deployment instructions at ${chalk.cyan(
				`https://cli.vuejs.org/guide/deployment.html`
			)}\n`
		)

		console.log('Build complete.')
	}
})
