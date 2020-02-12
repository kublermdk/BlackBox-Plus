const webpack = require('webpack');
const path = require('path');
const MarkdownPlugin = require('markdown-html-webpack-plugin');

module.exports = (env, args) => {

    console.log('Mode: ', args.mode); // args = {"_":[],"cache":null,"bail":null,"profile":null,"color":{"level":3,"hasBasic":true,"has256":true,"has16m":true},"colors":{"level":3,"hasBasic":true,"has256":true,"has16m":true},"d":true,"mode":"development","watch":true,"w":true,"info-verbosity":"info","infoVerbosity":"info","$0":"node_modules\\webpack\\bin\\webpack.js","debug":true,"output-pathinfo":true,"devtool":"eval-cheap-module-source-map"}"
    return {
        entry: {
            export: './src/export.js',
            initialKeywordingTensorflow: './src/initialKeywording-Tensorflow.js',
        },
        output: {
            path: path.resolve(__dirname, 'staging'),
            filename: '[name].js',
        },
        // devtool: "source-map", // Enable source mapping creation
        devtool: args.mode === 'production' ? 'source-map' : 'inline-source-map',
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
            ]
        },
    }
};