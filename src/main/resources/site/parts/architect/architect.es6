const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util/util'),
    content: require('/lib/xp/content')
};

exports.get = handleGet;

function handleGet(req) {
    const view = resolve('architect.html');
    const content = libs.portal.getContent();

    let model = getModel(content);

    const architectClientScript = libs.portal.assetUrl({
        path: 'parts/architect/architectClient.js'
    });

    const architectCss = libs.portal.assetUrl({
        path: 'parts/architect/architect.css'
    });

    return {
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                "<link href='" + architectCss + "' rel='stylesheet' type='text/css'/>",
                "<script src='" + architectClientScript + "' type='text/javascript'></script>"
            ]
        }
    };
}

const getModel = function(content){
    return {
        architect:{
            heading: content.displayName,
            image: libs.portal.imageUrl({
                id: content.data.image,
                scale: 'height(400)',
                filter: 'rounded(1);sharpen();border(2,0x777777)'
            }),
            preface: content.data.preface,
            bodyText: libs.portal.processHtml({
                value: content.data.bodyText
            })
        }
    };
}
