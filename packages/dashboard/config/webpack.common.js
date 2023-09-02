const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [{ loader: 'file-loader' }]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
            },
            // here we will be providing the loader. The goal of loader is to tell webpack to 
            // process some different files as we start importing them into our project.
            {
                // test will check if any files ending with m.js or .js needs to be processed.
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // @babel/preset-react helps to process react related elements like jsx
                        // @babel/preset-env will take care of es6, es7 etc related 
                        // standards to browser compatible es5 to easily understandable by browser
                        presets: ['@babel/preset-env'],
                        // @babel/preset-transform-runtime will process async functions
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
}