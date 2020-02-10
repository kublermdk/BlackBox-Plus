const webpack = require('webpack');
const path = require('path');
const MarkdownPlugin = require('markdown-html-webpack-plugin');

const config = {
    entry: {
        export: './src/export.js',
        initialKeywordingTensorflow: './src/initialKeywording-Tensorflow.js',
        // readme: './README.md'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    // devtool: "source-map", // Enable source mapping creation
    devtool: 'inline-source-map',// REMOVE IN PRODUCTION!
    watchOptions: {
        aggregateTimeout: 300,
        // poll: 1000,
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // {
            //     // Convert the README.md file to HTML
            //     // Uses `npm install markdown-loader html-loader`
            //     test: /\.md$/,
            //     use: [
            //         {
            //             loader: "html-loader"
            //         },
            //         {
            //             loader: "markdown-loader",
            //             options: {
            //                 /* your options here */
            //             }
            //         }
            //     ],
            //     exclude: /node_modules/
            // }
        ]
    },
    // plugins: [
    //     new MarkdownPlugin({
    //         filePath: './',
    //         exportPath: './dist/',
    //         isEncodeName: false, // if need to encode file name, like chinese
    //         template: '../src/index.html'
    //     }),
    // ]
};
module.exports = config;