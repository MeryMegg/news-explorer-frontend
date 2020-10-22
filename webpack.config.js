const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/index.js',
    favourites: './src/favourites/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name]/index.[chunkhash].js'
  },
  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      enforce: 'pre',
      use: [{
        loader: "babel-loader",
        options: {
          plugins: ["transform-class-properties"],
        },
      },
        'source-map-loader'
      ], // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/ // исключает папку node_modules
    },
    {
      test: /\.css$/i, // применять это правило только к CSS-файлам
      use: [(isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } }),
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2
        }
      },
        'postcss-loader',
      ]
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
    new HtmlWebpackPlugin({
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/pages/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
      chunks: ['main'] //указываем точку входа первой страницы
    }),
    new HtmlWebpackPlugin({
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/pages/favourites.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'favourites.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
      chunks: ['favourites'] //указываем точку входа второй страницы
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ]
}