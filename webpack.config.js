const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');

const path = require("path");
const fs = require("fs");

const PATHS = {
    src: path.join(__dirname, "./src"),
    dist: path.join(__dirname, "./dist"),
};

const PAGES_PUG = `${PATHS.src}/pug/`;
const PAGES_TO_CONVERT = fs
    .readdirSync(PAGES_PUG)
    .filter(filename => filename.endsWith(".pug"));

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === "development";
    const isEnvProduction = argv.mode === "production";

  return {
    entry: {
      app: [`${PATHS.src}/scripts/index.js`, `${PATHS.src}/scss/index.scss`]
    },
    output: {
      path: `${PATHS.dist}`,
      filename: "./scripts/[name].[fullhash].min.js"
    },
    target: "web",
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /node_modules/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    resolve: {
      extensions: [".js"]
    },
    devtool: isEnvDevelopment ? "eval-cheap-module-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: "pug-loader",
          exclude: "/node_modules"
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: { sourceMap: true }
            },
            {
              loader: "postcss-loader",
              options: { sourceMap: true }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true }
            }
          ],
          exclude: "/node_modules"
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: "/node_modules"
        },
        {
          test: /.(jpg|jpeg|png|svg)$/,
          type: "asset/inline"
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: "asset/inline"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...PAGES_TO_CONVERT.map(
        page =>
          new HtmlWebpackPlugin({
            template: `${PAGES_PUG}/${page}`,
            filename: `./${page.replace(/\.pug/, ".html")}`
          })
      ),
      new MiniCssExtractPlugin({
        filename: `styles/styles.[hash].min.css`
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "./src/assets/favicon",
            to: "assets/favicon",
            noErrorOnMissing: true
          },
          {
            from: "./src/assets/img",
            to: "assets/img",
            noErrorOnMissing: true
          },
          {
            from: "./src/assets/fonts",
            to: "assets/fonts",
            noErrorOnMissing: true
          },
          {
            from: "./src/assets/lotties",
            to: "assets/lotties",
            noErrorOnMissing: true
          }
        ]
      }),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        disable: process.env.NODE_ENV !== 'production', // Disable during development
        destination: 'dist/images',
        plugins: [
          imageminJpegtran({
            progressive: false
          }),
          imageminOptipng({
            optimization: 4
          })
        ]
      })
    ]
  };
};
