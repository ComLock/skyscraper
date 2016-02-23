const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util/util'),
    content: require('/lib/xp/content'),
    tags: require('/lib/skyscraper/tags')
};

exports.get = handleGet;

function handleGet(req) {
    const view = resolve('architects.html');

    const architects= libs.content.query({
        start: 0,
        count: 100,
        contentTypes: [
            app.name + ":architect"
        ]
    });

    let model = getModel(architects);

    const architectsClientScript = libs.portal.assetUrl({
        path: 'parts/architects/architectsClient.js'
    });

    const architectsCss = libs.portal.assetUrl({
        path: 'parts/architects/architects.css'
    });

    return {
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                "<link href='" + architectsCss + "' rel='stylesheet' type='text/css'/>",
                "<script src='" + architectsClientScript + "' type='text/javascript'></script>"
            ]
        }
    }
}

const getModel = function(architects){
    let model = {
        architects:[]
    };
    var tags = libs.tags.getTags();

    architects.hits.forEach(function(element,index,array){
        model.architects.push(
            {
                heading: element.displayName,
                image: libs.portal.imageUrl({
                    id: element.data.image,
                    scale: 'width(200)',
                    filter: 'rounded(1);sharpen();border(2,0x777777)'
                }),
                preface: element.data.preface,
                tags: element.data.tags,
                /*bodyText: libs.portal.processHtml({
                    value: element.data.bodyText
                })*/
            }
        );
    });
    return model;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}