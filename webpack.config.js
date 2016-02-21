module.exports =
[
    {
        entry: './src/main/resources/site/assets/pages/skyscraper/skyscraperClient.es6',
        output: {
            path: './build/resources/main/site/assets/pages/skyscraper/',
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
        entry: './src/main/resources/site/assets/parts/architect/architectClient.es6',
        output: {
            path: './build/resources/main/site/assets/parts/architect/',
            filename: "architectClient.js"
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
        entry: './src/main/resources/site/assets/parts/architects/architectsClient.es6',
        output: {
            path: './build/resources/main/site/assets/parts/architects/',
            filename: "architectsClient.js"
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
        entry: './src/main/resources/site/assets/parts/tags/tagsClient.es6',
        output: {
            path: './build/resources/main/site/assets/parts/tags/',
            filename: "tagsClient.js"
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
        entry: './src/test/resources/site/parts/architect/architect-test.es6',
        output: {
            path: './build/resources/test/site/parts/architect/',
            filename: "architect-test.js",
            libraryTarget: "commonjs"
        },
        externals: [
            "./architect.js",
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