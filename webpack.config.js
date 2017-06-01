const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
let inProd = process.env.NODE_ENV === "production";
let cssDev = ["style-loader","css-loader","sass-loader"];
let cssProd = ExtractTextPlugin.extract({
	fallback: "style-loader",
	use: ["css-loader","sass-loader"],
	publicPath: "../"
});

let styleConfig = inProd ? cssProd : cssDev;
let config = {
		context: SRC_DIR,
		entry: {
			app: './src.js'
		},
		output: {
			path: PUBLIC_DIR,
			filename: "app/[name].source.js"
		},
		devServer: {
			contentBase: SRC_DIR,
			compress: true,
			open: true,
			stats: "minimal",
			hot: true,
			port: 3333
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: "babel-loader"
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					use: [
						"file-loader?name=img/[name].[ext]",
						"image-webpack-loader"
						]
				},
				{test: /\.pug$/, use: "pug-loader?pretty=true"},
				{test: /\.s[ac]ss$/, use: styleConfig}
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
				title: "React JS Applicatio",
				hash: false,
			 	template: "./index.pug"
			})
		]
};

module.exports = config;