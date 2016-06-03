const getEntryFiles = require('./webpack.commons.js').getEntryFiles;
const getUglifyJsPlugin = require('./webpack.commons.js').getUglifyJsPlugin;
const webpack = require('webpack');

/* Assets */
module.exports.assets = () => {
    return {
        entry: getEntryFiles('.es6',
            [['main/resources/assets/parts', 'resources'],
                ['main/resources/assets/pages', 'resources']],
            ['client-polyfills']),
        devtool: 'source-map',
        console: true,
        output: {
            path: './build/resources/main/assets/',
            filename: '[name].js'
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
                    test: /\.less|\.css/,
                    loader: 'style!css!less'
                },
                {
                    test: /\.html$/,
                    loader: 'html'
                }
            ]
        },
        plugins: [
            getUglifyJsPlugin(),
            new webpack.ProvidePlugin({
                Promise: 'exports?global.Promise!es6-promise',
                fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
            })
        ]
    }
};
