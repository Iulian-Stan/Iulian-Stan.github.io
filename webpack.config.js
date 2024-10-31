const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: {
      app: [path.resolve(__dirname, './src/index.jsx')], // Entry point of your application
      vendors: ['react', 'react-dom'] // 3rd party dependencies
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash:8].js', // Output bundle file name
      assetModuleFilename: 'assets/[name].[contenthash:8][ext][query]',
      clean: true
    },
    module: {
      rules: [
        // Rule to load JavaScript (uses .babelrc)
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        // Rule to load CSS
        {
          test: /\.css$/,
          exclude: /node_modules/,
          oneOf: [
            {
              include: /\.module\.css$/,
              use: [
                env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    import: false
                  }
                }
              ]
            },
            {
              exclude: /\.module\.css$/,
              use: [
                env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader'
              ]
            }
          ]
        },
        // Rule to load Images
        {
          test: /\.(png|jpe?g|gif|webp)$/,
          type: 'asset/resource'
        },
        // Rule to load Fonts
        {
          test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'public', 'index.html'),
        inject: true
      }),
      env.production && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[id].[contenthash:8].css',
      }),
      new CopyWebpackPlugin({
        patterns: [{ context: 'public/', from: '*.(json|pdf)', toType: 'dir' }]
      })
    ].filter(plugin => plugin),
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: 'all'
      }
    },
    // Development server
    devServer: {
      static: {
        directory: path.join(__dirname, 'public') // static content folder
      },
      compress: true,
      port: 3000,
      hot: true
    },
    // Development tools
    devtool: env.production ? undefined : 'source-map'
  };
};
