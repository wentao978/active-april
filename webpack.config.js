var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log("11-22-33", process.env.NODE_ENV);

var out = process.env.NODE_ENV == "development" ? {
    path: path.resolve(__dirname, "./src"),
    filename: '[name].js'
} : {path: path.resolve(__dirname, "./dist/"), filename: '[name].js'};
var defindMode = process.env.NODE_ENV == "development" ? new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('development')}}) : new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}});

//webpack配置文件项
module.exports = {
    //入口文件
    entry: {
        index: './src/domain/index.js',
        common: ['react', 'react-dom', 'react-router']
    },
    //输出打包的文件
    // output:{
    // 	//输出路径,是一个绝对路径
    // 	path:path.resolve(__dirname,"./web/build"),//输出目录与devServer目录一致
    //     //打包文件名
    // 	filename: '[name].js',
    //     //chunkFilename: "[id].chunk.js",
    // 	//在html页面中需要的导入资源的路径
    //     publicPath: './build/'
    // },
    output: out,
    //devtool:'source-map', 混淆压缩时，这项要注释，否则报异常
    module: {
        rules: [
            {
                test: /\.(css|scss)$/, "loader": ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{"loader": "css-loader","options":{"modules":true}}, {"loader": "sass-loader","options":{"modules":true}}],

            })
            },
            {test: /\.js$/, exclude: /node_modules/, use: [{"loader": "react-hot-loader"}, {"loader": "babel-loader"}]},
            {test: /\.(png|jpg|gif)$/, use: [{"loader": "url-loader", "options": {"limit": "8192"}}]},

            //{test:/\.html$/,use:[{"loader":"html-loader"}]}
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    plugins: [
        // new HtmlWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: "bundle.css"
        }),
        //new webpack.optimize.DedupePlugin(),
        // new webpack.HotModuleReplacementPlugin(),//热加载插件,添加了--hot就不需要了，否则会有堆栈溢出
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false  // remove all comments
            },
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        defindMode
    ]
}
