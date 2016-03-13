module.exports =
    [
        /* Assets */
        {
            entry: {
                'pages/skyscraper/skyscraperClient': './src/main/resources/site/assets/pages/skyscraper/skyscraperClient.es6',
                'parts/brick/brickClient': './src/main/resources/site/assets/parts/brick/brickClient.es6',
                'parts/masonry/masonryClient': './src/main/resources/site/assets/parts/masonry/masonryClient.es6',
                'parts/tags/tagsClient': './src/main/resources/site/assets/parts/tags/tagsClient.es6'
            },
            output: {
                path: './build/resources/main/site/assets/',
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
                    }
                ]
            }
        },
        /* Page and part controllers, layouts, libs and services */
        {
            entry: {
                'parts/brick/brick': './src/main/resources/site/parts/brick/brick.es6',
                'parts/masonry/masonry': './src/main/resources/site/parts/masonry/masonry.es6',
                'parts/tags/tags': './src/main/resources/site/parts/tags/tags.es6',
                'pages/skyscraper/skyscraper': './src/main/resources/site/pages/skyscraper/skyscraper.es6'
            },
            output: {
                path: './build/resources/main/site/',
                filename: '[name].js',
                libraryTarget: 'commonjs'
            },
            externals: [
                '/lib/xp/portal',
                '/lib/xp/content',
                '/lib/xp/thymeleaf',
                '/lib/enonic/menu',
                '/lib/enonic/util/util',
                '/lib/openxp/jsonpath',
                '/lib/openxp/partnamespace'
            ],
            module: {
                loaders: [
                    {
                        test: /\.es6$/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        },
        /* Controller tests */
        {
            entry: {
                'parts/brick/brick-test': './src/test/resources/site/parts/brick/brick-test.es6',
                'pages/skyscraper/skyscraper-test': './src/test/resources/site/pages/skyscraper/skyscraper-test.es6',
                'lib/xp/mock/content': './src/test/resources/site/lib/xp/mock/content.es6',
                'lib/xp/mock/portal': './src/test/resources/site/lib/xp/mock/portal.es6'
            },
            output: {
                path: './build/resources/test/site/',
                filename: '[name].js',
                libraryTarget: 'commonjs'
            },
            externals: [
                './brick.js',
                './skyscraper.js',
                '/lib/xp/mock/portal',
                '/lib/xp/mock/content',
                '/lib/xp/thymeleaf',
                '/lib/xp/assert',
                '/lib/enonic/util/util'
            ],
            module: {
                loaders: [
                    {
                        test: /\.es6$/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            }
        }
    ];





