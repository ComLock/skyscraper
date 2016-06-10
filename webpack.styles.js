const autoprefixer = require('autoprefixer');
const getUglifyJsPlugin = require('./webpack.commons.js').getUglifyJsPlugin;

/* Styles */
module.exports.styles = () => {
    return {
        entry: './src/main/resources/assets/styles.es6',
        output: {
            path: './build/resources/main/assets/',
            filename: 'styles.js'
        },
        module: {
            loaders: [
                {
                    test: /\.es6$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.css$/,
                    loader: "style!css!"
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    loader: "style!css!postcss!less"
                },
                {
                    test: /\.(png|jpg|woff|woff2|svg)$/,
                    exclude: /node_modules/,
                    loader: 'url-loader?limit=8192'
                }
            ]
        },
        postcss: function () {
            return [autoprefixer];
        },
        plugins: [
            getUglifyJsPlugin()
        ]
    }
};