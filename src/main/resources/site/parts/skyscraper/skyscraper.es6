const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util/util'),
    content: require('/lib/xp/content'),
    metadata: require('/lib/gjensidige/metadata'),
    jsonPath: require('/lib/openxp/jsonpath')
};

exports.get = handleGet;

function handleGet(req) {

    const view = resolve('skyscraper.html');
    const content = libs.portal.getContent();

    const model = {
        heading: 'Skyscraper'
    }

    const skyscraperClientScript = libs.portal.assetUrl({
        path: 'parts/skyscraper/skyscraperClient.js'
    });

    return {
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                "<script src='" + skyscraperClientScript + "' type='text/javascript'></script>"
            ]
        }
    };
}