const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: './src/App.tsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [],
  resolve: {
    modules: ['./node_modules'],
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  devServer: {
    before: function(app, webpackServer) {
      // We override the listen() function to set keepAliveTimeout.
      // See: https://github.com/microsoft/WSL/issues/4340
      // Original listen(): https://github.com/webpack/webpack-dev-server/blob/f80e2ae101e25985f0d7e3e9af36c307bfc163d2/lib/Server.js#L744
      const { listen } = webpackServer;
      webpackServer.listen = function(...args) {
        const server = listen.call(this, ...args);
        server.keepAliveTimeout = 0;
        return server;
      };
    },
    contentBase: path.join(__dirname, '/dist'),
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                'react-hot-loader/babel',
                '@babel/plugin-proposal-function-sent',
                '@babel/plugin-proposal-export-namespace-from',
                '@babel/plugin-proposal-numeric-separator',
                '@babel/plugin-proposal-throw-expressions',
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                [
                  '@babel/plugin-transform-runtime',
                  {
                    helpers: true,
                    regenerator: true,
                  },
                ],
              ],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.js(x?)$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    helpers: true,
                    regenerator: false,
                  },
                ],
              ],
            },
          },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
};
