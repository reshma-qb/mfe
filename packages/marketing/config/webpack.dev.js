// merge the common webpack file with dev webpack file
const { merge } = require('webpack-merge');
// to show the output of webpack main.js in browser
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
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