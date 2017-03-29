var webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./config/dev.config')

const CLIENT_PORT = process.env.CLIENT_PORT || 3000

const server = new WebpackDevServer(webpack(config), {
  hot: true,
  contentBase: 'dev',
  quiet: false,
  noInfo: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  },
  historyApiFallback: {
    index: 'index.html'
  }
})
server.listen(CLIENT_PORT, '0.0.0.0', function () {
  console.log('Client server started at port ' + CLIENT_PORT)
})
