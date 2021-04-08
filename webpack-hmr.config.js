const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (options, webpack) => ({
  ...options,
  entry: ['webpack/hot/poll?100', options.entry],
  externals: [
    nodeExternals({ allowlist: ['webpack/hot/poll?100'] }),
  ],
  plugins: [
    ...options.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
    new RunScriptWebpackPlugin({ name: options.output.filename }),
  ],
});
