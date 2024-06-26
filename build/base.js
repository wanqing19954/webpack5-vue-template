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
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import WebpackBar from 'webpackbar'
import HelloPlugin from './plugins/hello-plugin.js'
const { DefinePlugin } = webpack

const _dirname = fileURLToPath(import.meta.url)
export const root = path.resolve(_dirname, '..', '..')
export const srcDir = path.resolve(root, 'src')
export const distDir = path.resolve(root, 'dist')
export const publicDir = path.resolve(root, 'public')

export const getBaseConfig = (isProd = false) => {
	const webpackConfig = {
		infrastructureLogging: { level: 'error' },
		stats: 'errors-only',
		cache: {
			// 开启持久化缓存
			type: 'filesystem',
			buildDependencies: {
				config: [_dirname],
			},
		},
		entry: {
			app: [path.resolve(srcDir, 'main.ts')],
		},
		output: {
			path: distDir,
			filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
			chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
			publicPath: '/',
		},
		resolve: {
			alias: {
				'@': srcDir,
				vue$: 'vue/dist/vue.runtime.esm.js',
			},
			extensions: [
				'.ts',
				'.tsx',
				'.js',
				'.mjs',
				'.jsx',
				'.vue',
				'.json',
				'.wasm',
			],
		},
		module: {
			noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
			rules: [
				{
					test: /\.vue$/,
					use: [
						{
							loader: 'vue-loader',
						},
					],
				},
				{
					test: /\.ts$/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: true,
								appendTsSuffixTo: ['\\.vue$'],
								configFile: path.resolve(root, 'tsconfig.json'),
							},
						},
					],
				},
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: true,
								appendTsSuffixTo: ['\\.vue$'],
								configFile: path.resolve(root, 'tsconfig.json'),
							},
						},
					],
				},

				{
					test: /\.m?js/,
					resolve: {
						fullySpecified: false,
					},
				},
				{
					test: /\.m?jsx?$/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheCompression: false,
							cacheDirectory: true,
						},
					},
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
					type: 'asset',
					generator: {
						filename: 'img/[name].[hash:8][ext]',
					},
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
					type: 'asset',
					generator: {
						filename: 'fonts/[name].[hash:8][ext]',
					},
				},
				{
					test: /\.css$/,
					use: [
						isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
						'css-loader',
						'postcss-loader',
					],
				},
				{
					test: /\.s(a|c)ss$/,
					use: [
						isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
						'css-loader',
						'postcss-loader',
						'sass-loader',
					],
				},
			],
		},
		optimization: {
			realContentHash: false,
			splitChunks: {
				cacheGroups: {
					defaultVendors: {
						name: 'chunk-vendors',
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						chunks: 'initial',
					},
					common: {
						name: 'chunk-common',
						minChunks: 2,
						priority: -20,
						chunks: 'initial',
						reuseExistingChunk: true,
					},
				},
			},
			minimizer: [
				new TerserPlugin({
					terserOptions: {},
					parallel: true,
					extractComments: false,
				}),
				// optimize-css-asset-webpack-plugin优化版，支持缓存和并行模式
				new CssMinimizerPlugin({
					parallel: true,
					minimizerOptions: {
						preset: [
							'default',
							{
								mergeLonghand: false,
								cssDeclarationSorter: false,
							},
						],
					},
				}),
			],
			runtimeChunk: 'single',
		},
		plugins: [
			new HelloPlugin(),
			new WebpackBar(),
			new VueLoaderPlugin(),
			new ForkTsCheckerWebpackPlugin({
				typescript: {
					extensions: {
						vue: {
							enabled: true,
						},
					},
					configFile: path.resolve(root, 'tsconfig.json'),
					diagnosticOptions: {
						semantic: true,
					},
				},
			}),
			new DefinePlugin({
				'process.env': {
					NODE_ENV: isProd ? '"production"' : '"development"',
					BASE_URL: '"/"',
				},
			}),

			new HtmlWebpackPlugin({
				title: 'Index Page',
				scriptLoading: 'defer',
				chunks: ['chunk-vendors', 'chunk-common', 'app'],
				template: 'public/index.html',
				filename: 'index.html',
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
							ignore: ['**/.DS_Store', path.resolve(root, 'public/index.html')],
						},
						info: {
							minimized: true,
						},
					},
				],
			}),
		],
	}

	if (isProd) {
		webpackConfig.plugins.unshift(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			})
		)
		webpackConfig.plugins.unshift(new CleanWebpackPlugin())
	}

	return webpackConfig
}
