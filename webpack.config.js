const path = require("path")

module.exports = {
  devtool: "inline-source-map",
  entry: [
    "@babel/polyfill",
    "./src/index.jsx",
  ],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js"
  },
  resolve: {
    modules: ["node_modules", "src", "dist"],
    extensions: [".js", ".jsx"],
    alias: {
      react: path.resolve("./node_modules/react")
    },
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // Ignore any .babelrc file to avoid confusion
        options: {
          babelrc: false,
          presets: ["@babel/preset-react", "@babel/preset-env"]
        }
      },
    ]
  }
}
