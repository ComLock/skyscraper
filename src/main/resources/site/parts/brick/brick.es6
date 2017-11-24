const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util/util'),
    brickModel: require('/lib/skyscraper/brick-model')
};

exports.get = handleGet;
exports.post = handleGet;

function handleGet() {


    const view = resolve('brick.html');
    const content = libs.portal.getContent();

    const model = libs.brickModel.getBrickModel(content);

    const brickClientScript = libs.portal.assetUrl({
        path: 'parts/brick/brickClient.js'
    });

    return {
        contentType: 'text/html',
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                `<script src="${brickClientScript}" type='text/javascript'></script>`
            ]
        }
    };
}
