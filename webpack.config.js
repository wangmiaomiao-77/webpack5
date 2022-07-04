const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') ;// 抽离css 将style转为link引入
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); // 压缩css，属于优化，不在plugin配置
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
module.exports = (env)=>{
    console.log(env,'env');
    return {
        // entry: './src/index.js',// 单入口
        entry:{ // 设置多入口文件存在的问题是引用同一插件时，会把资源分别打包到各自的chunk中，导致打包体积过大
            index:  './src/index.js',
            another: './src/another-module.js'
        },
        // 防止重复设置
        // entry:{
        //     index:{
        //         import: './src/index.js',
        //         dependOn: 'share', // 设置共享
        //     },
        //     another:{
        //         import: './src/another-module.js',
        //         dependOn: 'share'
        //     },
        //     // 最重要的是设置下面, 共享的资源单独拆离出来
        //     share: 'lodash'
        // },
        output: {
            // filename: 'bundle.js',
            filename: 'scripts/[name].[contenthash].js', // 这里的name可以获取到entry下配置得key（即index,another）
            // path: './build'  // 报错不是一个绝对路径
            path: path.resolve(__dirname,'./build'),
            clean: true, // 再次打包后删除原来打包生成的多余文件
            // assetModuleFilename: 'image/[contenthash][ext]', // 设置图片资源打包输出路径
            publicPath: 'localhost:8081', // 设置打包输出的公共路径（即打包后html中js，css等资源路径）
        },
        mode: env.production? 'production': 'development',// 使用压缩css的时候需要改成production
        // mode: 'production',// 使用压缩css的时候需要改成production
        plugins:[
            new HtmlWebpackPlugin({
                template: './index.html', // 打包html模板位置
                filename: 'app.html', // 打包输出文件名
                inject: 'body' // 配置打包的js放于html的引入位置
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[contenthash].css' // 设置输出的css绝对路径以及文件命名
            }),
        ],
        devtool: 'inline-source-map', // 打包后的文件在浏览器可以指向源文件，且打包后js可解读
        devServer: {
            static: './build'
        },
        module:{
            rules:[
                { // resource资源导出到build
                    test: /\.png$/,
                    type: 'asset/resource',
                    generator:{ // 同上面assetModuleFilename，但是比assetModuleFilename优先级高
                        filename: 'image/[contenthash][ext]'
                    }
                },
                { // 资源未导出到build，生成base64地址
                    test: /\.svg$/,
                    type: 'asset/inline',
                },
                {
                    test: /\.txt$/,
                    type: 'asset/source',
                },
                { // 通用资源类型：在resource和inline之间选择
                // 当图片资源低于8kb自动选择inline的模式也就是没有打包输出，且url为base64，高于8kb则自动使用resource打包输出生成多一个文件，且地址为本地资源url
                    test: /\.jpg$/,
                    type: 'asset',
                    parser:{ // 修改最大限制为4M
                        dataUrlCondition:{
                            maxSize: 4* 1024*1024
                        }
                    }
                },
                {
                    test: /\.(css|less)$/,
                    // 注意顺序不可颠倒，webpack解析是从后往前来的加载的，先解析css转成可识别的，然后将css放到style标签上
                    // use: ['style-loader','css-loader']
                    // use: ['style-loader','css-loader','less-loader']
                    use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/, // 排除node_modules包里面的js
                    use:{
                        loader: 'babel-loader',
                        options:{
                            presets: ['@babel/preset-env'], // 添加刚才下载的预设
                        }
                    }
                }
            ]
        },
        // 优化配置
        optimization:{
            minimizer:[
                new CssMinimizerWebpackPlugin(),
                new TerserPlugin()
            ],
            // 使用webpack内置的分离插件，进行不同入口js文件使用相同资源去除重复打包，抽离相同资源(第三方库打包到单独文件下)
            splitChunks:{
                // chunks: 'all'
                cacheGroups:{
                    vendor:{
                        test: /[\\/]node_modules[\\/]/, // 检索第三方库以目录名
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        //警告 webpack 的性能提示
        // 如果出现限制最大size的提示导致打包报错处理
        performance: {
            hints:'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        },
    }
}