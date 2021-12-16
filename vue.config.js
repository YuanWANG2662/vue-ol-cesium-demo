const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

let cesiumSource = './node_modules/cesium/Source/'
let cesiumBuild = 'node_modules/cesium/Build/Cesium/'

module.exports = {
    //Cesium webpack settings
    publicPath: '',
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([{ from: cesiumSource + 'Workers', to: 'Workers' }]),
            new CopyWebpackPlugin([{ from: cesiumSource + 'ThirdParty', to: 'ThirdParty' }]),
            new CopyWebpackPlugin([{ from: cesiumBuild + 'Assets', to: 'Assets' }]),
            new CopyWebpackPlugin([{ from: cesiumBuild + 'Widgets', to: 'Widgets' }]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./')
            })
        ],
        module: {
            unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/,
            unknownContextCritical: false,
            rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'node_modules/cesium/Source'),
                use: { loader: require.resolve('@open-wc/webpack-import-meta-loader') }
            }
            ]
        }
    },
}

