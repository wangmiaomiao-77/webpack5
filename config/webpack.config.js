/*
 * @Description: 
 * @Date: 2022-06-27 17:30:04
 */

const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.config.common')
const devConfig = require('./webpack.config.dev')
const prodConfig = require('./webpack.config.prod')

module.exports = (env)=>{
    switch(true){
        case env.development:
            return merge(commonConfig,devConfig)
        case env.production:
            return merge(commonConfig,prodConfig)
        default: 
            return new Error('NO matching configuration was found')
    }
}