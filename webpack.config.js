const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path:  path.resolve(__dirname, 'build')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    devServer: {
        port: 3000,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.js$\.jpg$/,
                use: ['babel-loader']
            },

            
            

            {
                test: /\.scss$/i,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]

    },
    
}