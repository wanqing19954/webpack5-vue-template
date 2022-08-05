module.exports = {
	sourceType: 'unambiguous',
	presets: [
		'@babel/preset-env',
		{
			useBuiltIns: 'usage',
			corejs: 3,
			modules: false
		}
	],
	plugins: [
		'@babel/plugin-transform-runtime',
		{
			regenerator: false,
			corejs: false,

			helpers: true
		}
	]
}
