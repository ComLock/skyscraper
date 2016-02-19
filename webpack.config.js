module.exports =
[
    {
        entry: './src/main/resources/site/assets/parts/skyscraper/skyscraperClient.es6',
        output: {
            path: './build/resources/main/site/assets/parts/skyscraper/',
            filename: "skyscraperClient.js"
        },
        module: {
            loaders: [
                {
                    test: /\.es6$/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    },
    {
        entry: './src/test/resources/site/parts/skyscraper/skyscraper-test.es6',
        output: {
            path: './build/resources/test/site/parts/skyscraper/',
            filename: "skyscraper-test.js",
            libraryTarget: "commonjs"
        },
        externals: [
            "./skyscraper.js",
            "/lib/xp/assert",
            "/lib/xp/mock/portal",
            "/lib/xp/mock/content",
            "/lib/enonic/util/util"
        ],
        module: {
            loaders: [
                {
                    test: /\.es6$/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    }
];