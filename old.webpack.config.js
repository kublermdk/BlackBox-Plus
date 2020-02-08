var webpack = require('webpack'),
    path = require('path'),
    extend = require('extend'),
    //打开浏览器
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    // 提取WebPACK文本插件(如css,less,sass)
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    //代码压缩
    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


//基础配置
const config = {
    //入口
    entry: {
        index: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/js/index.js')
        ],
        vendors: ['zepto/zepto.min', 'drupal-common']
    },
    //出口
    output: {
        path: path.resolve(__dirname, 'build'),
        // publicPath: 'http://js.40017.cn/cn/sl/test/', //线上文件请求的地址
        publicPath: '/build/',
        filename: '[name].build.js'
    },
    //装载器
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel?presets[]=es2015&presets[]=react'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192&name=img/[name].[ext]'
        }],

    },
    // webpack-dev-server配置
    devServer: {
        host: '10.101.30.120',
        port: 8080
    }
}

//开发配置
const devConfig = extend(true, {}, config, {
    //入口
    entry: {
        index: [
            'babel-polyfill',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://10.101.30.120:8080',
            path.resolve(__dirname, 'src/js/index.js')
        ]
    },
    devtool: 'source-map',
    //插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://10.101.30.120:8080/src/html'
        }),
        //提取公用部分
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("css/[name].css"),
        //将暂停它遇到语法错误时。一旦你修复了错误，它会自动恢复。
        new webpack.NoErrorsPlugin()
    ],
    // webpack-dev-server配置
    devServer: {
        hot: true
    }
})

//发布配置
const deployConfig = extend(true, {}, config, {
    //插件
    plugins: [
        new uglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new OpenBrowserPlugin({
            url: 'http://10.101.30.120:8080/src/html'
        }),
        //提取公用部分
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("css/[name].css")
    ]
});


//根据环境输出
module.exports = process.env.DEBUG ? devConfig : deployConfig;


// process.pid：当前进程的进程号。
// process.version：Node的版本，比如v0.10.18。
// process.platform：当前系统平台，比如Linux。
// process.title：默认值为“node”，可以自定义该值。
// process.argv：当前进程的命令行参数数组。
// process.env：指向当前shell的环境变量，比如process.env.HOME。
// process.execPath：运行当前进程的可执行文件的绝对路径。
// process.stdout：指向标准输出。
// process.stdin：指向标准输入。
// process.stderr：指向标准错误。
