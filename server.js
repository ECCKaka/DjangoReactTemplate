var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.local.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  headers: { "Access-Control-Allow-Origin": "*" },
  stats: {
    colors: true
  }
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at 0.0.0.0:3000')
});
