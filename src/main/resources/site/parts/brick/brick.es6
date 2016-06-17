var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util/util'),
    brickModel: require('/lib/skyscraper/brick-model')
};

exports.get = handleGet;
exports.post = handleGet;

function handleGet(req) {


    const view = resolve('brick.html');
    const content = libs.portal.getContent();

    let model = libs.brickModel.getBrickModel(content);

    let brickClientScript = libs.portal.assetUrl({
        path: 'parts/brick/brickClient.js'
    });
    
    let body = libs.thymeleaf.render(view, model);

    return {
        contentType:'text/html',
        body: body,
        pageContributions: {
            headEnd: [
                "<script src='" + brickClientScript + "' type='text/javascript'></script>"
            ]
        }
    };
}


