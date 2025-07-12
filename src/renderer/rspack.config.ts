import { Configuration, HtmlRspackPlugin, DefinePlugin } from '@rspack/core';
import { VueLoaderPlugin } from 'vue-loader';
import path from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const configuration: Configuration = {
  context: __dirname,
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.join(process.cwd(), '../../build/renderer'),
    publicPath: 'auto',
    filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
    clean: true,
  },
  experiments: {
    css: true,
  },
  devServer: {
    port: 8080,
    hot: true,
    open: false,
    historyApiFallback: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlRspackPlugin({
      template: './index.html',
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.ts$/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              // 同时使用 `modern-compiler` 和 `sass-embedded` 可以显著提升构建性能
              // 需要 `sass-loader >= 14.2.1`
              api: 'modern-compiler',
              implementation: require.resolve('sass-embedded'),
            },
          },
        ],
        // 如果你需要将 '*.module.(sass|scss)' 视为 CSS Modules 那么将 'type' 设置为 'css/auto' 否则设置为 'css'
        type: 'css/auto',
      },
      {
        test: /\.less$/,
        loader: 'less-loader',
        type: 'css',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
};

export default configuration;
