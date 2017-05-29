const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');

var inProd = process.env.NODE_ENV !== "production";
var cssDev = ["style-loader","css-loader","sass-loader"];
var cssProd = ExtractTextPlugin.extract({
	fallback: "style-loader",
	use: ["css-loader","sass-loader"],
	publicPath: PUBLIC_DIR
});

console.log(inProd);

var styleConfig = inProd ? cssProd : cssDev;

let config = {
	context: SRC_DIR,
		entry: {
			app: './src.js'
		},
		output: {
			path: PUBLIC_DIR,
			filename: "app/[name].source.js",
		},
		devServer: {
			contentBase: PUBLIC_DIR,
			inline: true,
			open: true,
			hot: true,
			port: 5051
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "babel-loader",
							options: {
								presets: ["es2015", "react", "stage-2"]
							}
						}
					]
				},
				{
					test: /\.s[ac]ss$/,
					use: styleConfig
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new webpack.DefinePlugin({
					'process.env': {
						'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
					}
        }),
			new ExtractTextPlugin({
				filename: "css/style.css",
				disable: !inProd,
				allChunks: true
			}),
			new HtmlWebpackPlugin({
				title: "React JS Application",
				// minify: {
				// 	collapseWhitespace: true
				// },
				hash: true,
			 	template: "index.html"
			})
		]
};

module.exports = config;