const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // devtool: "source-map", // Enable source mapping creation
    devtool: 'inline-source-map',// REMOVE IN PRODUCTION!
    // watch: true, // apply changes
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
            }
        ]
    }
};
module.exports = config;