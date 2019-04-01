const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    isProduction
                    ? MiniCssExtractPlugin.loader
                    : {
                        loader: 'style-loader', options: { sourceMap: true}
                    },
                    {
                        loader: 'css-loader', options: { sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader', options: { sourceMap: true}
                    },
                    {
                        loader: 'sass-loader', options: { sourceMap: true}
                    }
                ]
            },
        ]
    },
    plugins: 
    [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}