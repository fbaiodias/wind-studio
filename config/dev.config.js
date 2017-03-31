const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VersionFile = require('webpack-version-file-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const port = 3000

module.exports = {
  devtool: 'source-map',
  entry: {
    'new-tab': [
      path.join(__dirname, '../chrome/app/new-tab/index'),
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server'
    ],
    'options': [
      path.join(__dirname, '../chrome/app/options/index'),
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    path: path.join(__dirname, '../dev'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: `http://localhost:${port}/`
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'New Tab',
      filename: 'new-tab.html',
      template: 'chrome/views/new-tab.html.ejs',
      chunks: ['new-tab']
    }),
    new HtmlWebpackPlugin({
      title: 'Options',
      filename: 'options.html',
      template: 'chrome/views/options.html.ejs',
      chunks: ['options']
    }),
    new VersionFile({
      packageFile: path.join(__dirname, '../package.json'),
      template: 'chrome/manifest.dev.json.ejs',
      outputFile: 'dev/manifest.json'
    }),
    new CopyWebpackPlugin(
      [{
        context: 'chrome/assets',
        from: '**/*'
      }],
      {
        copyUnmodified: true
      }
    ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      'process.env': {
        DEVTOOLS: !!process.env.DEVTOOLS || true,
        DEVTOOLS_EXT: !!process.env.DEVTOOLS_EXT,
        OPENWEATHERMAP_KEY: `'${process.env.OPENWEATHERMAP_KEY}'`
      }
    })
  ],
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      http: 'stream-http',
      https: 'https-browserify'
    },
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react-hmre'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  postcss: () => require('./postcss.config'),
  externals: {
    net: '{}',
    fs: '{}',
    tls: '{}',
    console: '{}',
    'require-dir': '{}'
  },
  timeout: 60000
}
