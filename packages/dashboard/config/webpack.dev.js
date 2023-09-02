// merge the common webpack file with dev webpack file
const { merge } = require('webpack-merge');
// to show the output of webpack main.js in browser
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        // this will update load the main.js like http://localhost:8082/main.js.
        // so when publicPath is not given it'll take the main.js relative to remoteEntry.js
        // but when it comes to nested urls we need to provide publicPath like this
        // so to avoid the issue by default we can add this path.
        publicPath: 'http://localhost:8083/'
    },
    devServer: {
        port: 8083,
        historyApiFallback: {
            index: '/index.html'
        },
        // to load some fonts when we're loading the application inside container
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp': './src/bootstrap'
            },
            // shared: ['react', 'react-dom']
            // instead of sharing each deps as above, by doing this whole dependencies from 
            // package dependencies, we don't need to 
            // pick each package 1 by 1 in shared arrayList. So whenever a new deps is added
            // and re-run the app it'll add that shared dep in webpack and it'll reduce the
            // size of js files being loaded in browser also
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

// devConfig is given as 2nd param, which will override the first params object
module.exports = merge(commonConfig, devConfig);