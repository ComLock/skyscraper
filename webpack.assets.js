const path = require('path');
const getEntryFiles = require('./webpack.commons.js').getEntryFiles;
const getUglifyJsPlugin = require('./webpack.commons.js').getUglifyJsPlugin;
const webpack = require('webpack');

/* Assets */
module.exports.assets = () => {
    return {
        entry: getEntryFiles('.es6',
            [['main/resources/assets/parts', 'assets'],
                ['main/resources/assets/pages', 'assets']],
            ['client-polyfills']),
        devtool: 'source-map',
        //console: true, // TODO unknown property in webpack 3
        output: {
            path: path.join(__dirname, './build/resources/main/assets/'), // Must be absolute in webpack3
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test: /\.es6$/,
                    loader: 'babel-loader',
                    query: {
                        babelrc: false, // The .babelrc file should only be used to transpile *.babel.js files.
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.less|\.css/,
                    loader: 'style-loader!css-loader!less-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ]
        },
        plugins: [
            getUglifyJsPlugin(),
            new webpack.ProvidePlugin({
                Promise: 'exports-loader?global.Promise!es6-promise',
                fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
            })
        ],
        stats: {
            colors: true,
            hash: false,
            maxModules: 0,
            modules: false,
            moduleTrace: false,
            timings: false,
            version: false,
        },
    }
};
