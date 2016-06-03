const getEntryFiles = require('./webpack.commons.js').getEntryFiles;

/* Page and part controllers, layouts, libs and services */
module.exports.site = () => {
    return {
        entry: getEntryFiles('.es6',
            [['main/resources/site', 'site']],
            ['server-polyfills']),
        output: {
            path: './build/resources/main/site/',
            filename: '[name].js',
            libraryTarget: 'commonjs'
        },
        externals: [
            /\/lib\/(openxp|xp|enonic|skyscraper).+/
        ],
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
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'file?hash=sha512&digest=hex&name=images/[name].[ext]',
                        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ]
                }
            ]
        }
    }
};
