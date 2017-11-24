const autoprefixer = require('autoprefixer');
const path = require('path');
const getUglifyJsPlugin = require('./webpack.commons.js').getUglifyJsPlugin;

/* Styles */
module.exports.styles = () => {
    return {
        entry: './src/main/resources/assets/styles.es6',
        output: {
            path: path.join(__dirname, './build/resources/main/assets/'), // Must be absolute in webpack3
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
                    loader: "style-loader!css-loader"
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    loader: "style-loader!css-loader!postcss-loader!less-loader"
                },
                { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                    loader: 'url-loader?limit=100000&name=[name].[ext]'
                }
            ]
        },
        /*postcss: function () { // TODO Not valid in webpack3
            return [autoprefixer];
        },*/
        plugins: [
            getUglifyJsPlugin()
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
