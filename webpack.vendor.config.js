{
  plugins: [new webpack.DllPlugin({
    context: __dirname,
    name: "[name]_[hash]",
    path: path.join(__dirname, "manifest.json"),
  })]
}