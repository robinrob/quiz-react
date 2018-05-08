const webpack = require("webpack")
const path = require("path")

module.exports = {
  mode: 'development',
  devtool: "source-map",
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    './src/index'
  ],
  // entry: {
  //   main: [
  //   "@babel/polyfill",
  //   "./src/index.jsx",
  //   ],
  //   // ReactStuff:[
  //   //   'react', 
  //   //   'react-dom', 
  //   //   'react-router', 
  //   //   'redux', 
  //   //   'react-redux'
  //   // ],
  //   // BootstrapStuff: [
  //   //   'bootstrap', 
  //   //   'react-bootstrap'
  //   // ]
  // },
  devServer: {
    contentBase: './',
    publicPath: "http://localhost:8080",
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        pathRewrite: {"^/api" : ""}
      }
    },
    hot: true
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js", ".jsx", ".css"],
    alias: {
      react: path.resolve("./node_modules/react")
    },
    symlinks: false,
  },
  module: {
    rules: [
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.sass$/,
        use: [
          // Order in which webpack applies loaders is from last to first!
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        // Ignore any .babelrc file to avoid confusion
        options: {
          babelrc: false,
          presets: ["@babel/preset-react", "@babel/preset-env"]
        }
      },
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
    // new webpack.DllPlugin({ 
    //   name: '[name]', 
    //   path: path.join('dist', '[name].json')
    // })
  ]
}
