const path = require('path')
module.exports = {
    output: {
        filename: 'scripts/[name].js', // 这里的name可以获取到entry下配置得key（即index,another）
    },
    mode: 'development',// 使用压缩css的时候需要改成production
    // devtool: 'eval',// webpack默认不设置即为eval模式，打包后文件自动添加eval包裹，并在后面追加//# sourceURL，引入babel行数错误
    // devtool: 'source-map', // 多生成一个map文件，并且可以定位源代码，且.js文件末尾存在注释，行数正确
    // devtool: 'hidden-source-map', // 多生成一个map文件,不能锁定源代码，且.js文件末尾不会存在注释
    // devtool: 'inline-source-map', // 打包后的文件在浏览器可以指向源文件，且打包后js可解读
    // devtool: 'eval-source-map', // 可以指向源文件,每个module会通过eval()执行，并生成一个dataUrl形式的SourceMap(注释)，同时不会生成map文件，行数不会错误
    // devtool: 'cheap-source-map', // 可以指向源文件,多生成map文件，不存在列数，比source-map打包体积小，在babel打包后行数识别错误
    devtool: 'cheap-module-source-map', // 可以指向源文件,多生成map文件，不存在列数，比source-map打包体积小,并且在引用babel等资源打包后不会导致识别错误行数
    devServer: {
        // static: './build', 
        static: path.resolve(__dirname,'../build'), // 直接访问http://localhost:3000/页面404，http://localhost:3000/app.html可正常访问，static是根据内存中地址来的，不是打包后的项目地址
        compress:true, // 是否压缩 服务器传输到浏览器中代码压缩 http响应头中增加 Content-Encoding: gzip
        port: 3000, // 设置端口号
        headers:{ // response header增加请求头
            'X-Access-Token': 123
        },
        // 跨域
        proxy:{
            '/api': 'http://localhost:9000'
        },
        https: false,
        historyApiFallback: true, // 设置路由未找到404报错问题
        host:'0.0.0.0', // 设置共享可访问本地地址资源
        hot: true, // 热替换
        // liveReload: true, // 热加载
    },
}