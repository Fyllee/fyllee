import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';
import type { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (options, webpack): Configuration => ({
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
