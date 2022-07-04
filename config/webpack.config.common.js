const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') ;// 抽离css 将style转为link引入
module.exports = {
        entry:{ // 设置多入口文件存在的问题是引用同一插件时，会把资源分别打包到各自的chunk中，导致打包体积过大
            index:  './src/index.js',
            another: './src/another-module.js'
        },
        output: {
            path: path.resolve(__dirname,'../build'),
            clean: true, // 再次打包后删除原来打包生成的多余文件
            // assetModuleFilename: 'image/[contenthash][ext]', // 设置图片资源打包输出路径
        },
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
}