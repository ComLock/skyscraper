const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util/util'),
    content: require('/lib/xp/content'),
    tags: require('/lib/skyscraper/tags'),
    namespaces: require('/lib/enonic/namespaces'),
    jsonPath: require('/lib/openxp/jsonpath')

};

exports.get = handleGet;

function handleGet(req) {

    let query = '';
    let tags = req.params.tags;
    if (tags){
        tags = tags.replace(',',' ');
        query = "fulltext('data.tags', '"+ tags +"', 'AND')";
    }
    libs.util.log(query);
    const view = resolve('architects.html');

    const architects= libs.content.query({
        start: 0,
        count: 100,
        query: query,
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
        contentType: 'text/html',
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
    let pageComponents = libs.jsonPath.process(libs.portal.getContent(), '$..components.*');

    let model = {
        pageComponentsNamespaces: libs.namespaces.getPageComponentsNamespaces(pageComponents),
        namespaces: libs.namespaces.get(app.name, libs.portal.getComponent()),
        componentUrl: libs.portal.componentUrl({}),
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