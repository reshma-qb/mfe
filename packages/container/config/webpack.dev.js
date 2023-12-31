// merge the common webpack file with dev webpack file
const { merge } = require('webpack-merge');
// to show the output of webpack main.js in browser
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/'
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js'
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies,
        }),
    ]
}

// devConfig is given as 2nd param, which will override the first params object
module.exports = merge(commonConfig, devConfig);