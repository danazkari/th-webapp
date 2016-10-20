const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: 'source-map',
    entry: [
        './index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: process.env.CAST_BUILD === 'true' ? 'index.chromecast.html' : 'index.html',
            filename: 'index.html',
            hash: true
        }),
        new ExtractTextPlugin("styles.css"),

        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.APPLICATION_ID': JSON.stringify('AC1B96F6'),
            'process.env.CAST_BUILD': JSON.stringify(process.env.CAST_BUILD === 'true')
        }),

        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        
        new CopyWebpackPlugin([
            {
                from: process.env.CAST_BUILD === 'true'? './CNAME.chromecast' : './CNAME',
                to: './CNAME',
                toType: 'file'
            }
        ])
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.png?/,
                loader: 'file?[path][name]-[hash].[ext]',
                exclude: [/node_modules/]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }
        ]
    }
};
