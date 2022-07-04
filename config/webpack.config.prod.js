
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); // 压缩css，属于优化，不在plugin配置
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
module.exports ={
        output: {
            filename: 'scripts/[name].[contenthash].js', // 这里的name可以获取到entry下配置得key（即index,another）
            publicPath: 'localhost:8081', // 设置打包输出的公共路径（即打包后html中js，css等资源路径）
        },
        mode: 'production',// 使用压缩css的时候需要改成production
        // 优化配置
        optimization:{
            minimizer:[
                new CssMinimizerWebpackPlugin(),
                new TerserPlugin()
            ],
        },
        // 生产环境打包提示报错时 配置
        performance: {
            hints:false,
        },
}