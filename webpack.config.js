const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './src/index.js',
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
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
