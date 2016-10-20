const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: 'eval-source-map',
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        './index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            hash: true
        }),
        
        new webpack.HotModuleReplacementPlugin(),
        
        new webpack.NoErrorsPlugin(),
        
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.APPLICATION_ID': JSON.stringify('AC1B96F6'),
            'process.env.CAST_BUILD': JSON.stringify(process.env.CAST_BUILD === 'true')
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: [/node_modules/, /styles/],
                loaders: ['babel']
            },
            {
                test: /\.png?/,
                loader: 'file?[path][name]-[hash].[ext]',
                exclude: [/node_modules/]
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
};
