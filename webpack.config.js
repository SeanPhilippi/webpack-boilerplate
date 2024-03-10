const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // grab name from entry key, grab contenthash from file content, helps with caching
    filename: '[name][contenthash].js',
    // clean dist folder before each build to prevent multiple bundle[contenthash].js files
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true, // open browser automatically
    hot: true, // use hot-reloading
    compress: true, // allow gzip compressionn
    historyApiFallback: true, // serve index.html for all 404 routes, can change for object for more custom behavior
  },
  devtool: 'source-map', // create a .js.map file to help with debugging
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      { // for compatibility with different browsers
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Starer',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
};
