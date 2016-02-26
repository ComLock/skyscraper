var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util/util')
};

exports.get = handleGet;
exports.post = handleGet;


function handleGet(req) {

    const view = resolve('architect.html');
    const content = libs.portal.getContent();

    let model = getModel(content);

    let architectClientScript = libs.portal.assetUrl({
        path: 'parts/architect/architectClient.js'
    });

    let architectCss = libs.portal.assetUrl({
        path: 'parts/architect/architect.css'
    });

    let body = libs.thymeleaf.render(view, model);

    return {
        contentType:'text/html',
        body: body,
        pageContributions: {
            headEnd: [
                "<link href='" + architectCss + "' rel='stylesheet' type='text/css'/>",
                "<script src='" + architectClientScript + "' type='text/javascript'></script>"
            ]
        }
    };
}

const getModel = function(content){

    let imageUrl = libs.portal.imageUrl({
        id: content.data.image,
        scale: 'height(400)',
        filter: 'rounded(1);sharpen();border(2,0x777777)'
    });

    let bodyHtml = libs.portal.processHtml({
        value: content.data.bodyText
    });



    return {
        architect:{
            heading: content.displayName,
            image: imageUrl,
            preface: content.data.preface,
            bodyText: bodyHtml
        }
    };
}
