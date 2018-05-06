const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        '@babel/polyfill',
        './src/index.jsx',
    ],
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src', 'dist'],
        extensions: ['.js', '.jsx'],
        alias: {
            react: path.resolve('./node_modules/react')
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // Ignore any .babelrc file to avoid confusion
                options: {
                    babelrc: false,
                    presets: ['@babel/preset-react', '@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
    ]
}
