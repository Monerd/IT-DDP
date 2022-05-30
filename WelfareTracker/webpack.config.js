const path = require("path");
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public'),
        assetModuleFilename: pathData => {
          const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
          return `${filepath}/[name][ext]`;
        },
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: '404',
            template: './pages/404.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'login',
            template: './pages/login.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'registration',
            template: './pages/registration.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'reminders',
            template: './pages/reminders.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'review',
            template: './pages/review.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'transaction',
            template: './pages/transaction.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpg|gif|svg|ico|eot|ttf|woff)$/,
            type: "asset/resource",
          },
          {
            test: /\.html$/,
            use: "html-withimg-loader",
          },
        ],
    },
}