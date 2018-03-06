const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'babel-polyfill',
        './src/index.jsx',
    ],
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: 'bundle.js'
    },
    resolve: {
        moduleDirectories: ['node_modules', 'src', 'dist'],
        extensions: ['', '.js', '.jsx'],
        alias: {
            react: path.resolve('./node_modules/react')
        },
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /.s(a|c)fdsss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
