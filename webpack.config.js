const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: './src/scripts/index.js',
    favourites: './src/scripts/favourites.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './scripts/[name].[chunkhash].js'
  },
  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/ // исключает папку node_modules
    },
    {
      test: /\.css$/i, // применять это правило только к CSS-файлам
      use: [
        { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'postcss-loader',
      ], // к этим файлам нужно применить пакеты, которые мы уже установили
    },
    {
      test: /\.(gif|png|jpe?g|svg|ico|webp)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "./images/[name].[ext]",
          },
        },
        {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.9],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "./vendor/fonts/[name].[ext]",
        },
      },
    },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({ // настроили плагин
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/pages/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({ // настроили плагин
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/pages/favourites.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'favourites/index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
      chunks: ['favourites']
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ]
}