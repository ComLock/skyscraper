const path = require('path');
const SRC_MAIN_RESOURCES = 'src/main/resources';
const getEntryFiles = require('./webpack.commons.js').getEntryFiles;


/* Page and part controllers, layouts, libs and services */
module.exports.site = () => {
    return {
        entry: getEntryFiles('.es6',
            [['main/resources/site', 'site']],
            ['server-polyfills']),
        output: {
            path: path.join(__dirname, './build/resources/main/site/'), // Must be absolute in webpack3
            filename: '[name].js',
            libraryTarget: 'commonjs'
        },
        externals: [
            /\/lib\/(openxp|xp|enonic|skyscraper).+/
        ],
        module: {
            loaders: [
                {
                    test: /\.(es6|js)$/,
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
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=images/[name].[ext]',
                        'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ]
                }
            ]
        }
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
