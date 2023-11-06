import path from "path";
import {  ProvidePlugin } from "webpack";

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const config = {
    context: __dirname,
    mode: 'development',
    entry: './index.js',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|png|jpg|svg|gif)$/i,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', 'jsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./public/index.html")
        }),
        new ForkTsCheckerWebpackPlugin()
    ],
    devServer: {
        static: path.join(__dirname, "..", "build"),
        compress: true,
        port: 8000
    }
}

export default config