const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/main.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,
        exclude: /(node_modules)/,
        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders we use plugin to do his work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
            },
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: 'css-loader',
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: 'postcss-loader',
          },
          {
            loader: 'resolve-url-loader', //resolve-url-loader needs to come *BEFORE* sass-loader
            options: {
              sourceMap: true,
            },
          },
          {
            // First we transform SASS to standard CSS
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true,
            },
          },
        ],
      },
      // {
      //   // Now we apply rule for images
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   exclude: /(node_modules|fonts)/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         outputPath: 'assets/img/',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /(node_modules|fonts)/,
        loader: 'url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024,
          outputPath: 'assets/img/',
        },
      },
      {
        test: /\.svg$/,
        exclude: /(node_modules|fonts)/,
        loader: 'svg-url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024,
          // Remove quotes around the encoded URL –
          // they’re rarely useful
          noquotes: false,
          outputPath: 'assets/img/',
        },
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        exclude: /(node_modules|fonts)/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|img)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css',
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
