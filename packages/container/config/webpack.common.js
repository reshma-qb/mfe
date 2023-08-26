const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
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
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        // @babel/preset-transform-runtime will process async functions
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}