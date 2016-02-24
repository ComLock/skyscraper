const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util/util'),
    namespaces: require('/lib/enonic/namespaces')
};

exports.get = handleGet;

function handleGet(req) {

    const view = resolve('tags.html');

    let model = getModel();

    const tagsClientScript = libs.portal.assetUrl({
        path: 'parts/tags/tagsClient.js'
    });

    const tagsCss = libs.portal.assetUrl({
        path: 'parts/tags/tags.css'
    });

    return {
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                "<link href='" + tagsCss + "' rel='stylesheet' type='text/css'/>",
                "<script src='" + tagsClientScript + "' type='text/javascript'></script>"
            ]
        }
    };
}

const getModel = function(){
    let model = {
        namespaces: libs.namespaces.get(app.name, libs.portal.getComponent()),
        componentUrl: libs.portal.componentUrl({}),
        updateTagsServiceUrl: libs.portal.serviceUrl({
            service: 'updateTags',
            params: {
                tag: ''
            }
        })
    };

    let content = libs.portal.getContent();

    if (content.type == app.name + ":architect"){
        model.tags = content.data.tags;
        return model;
    }

    let result = libs.content.query({
        start: 0,
        count: 100,
        contentTypes: [
            app.name + ":architect"
        ],
        aggregations: {
            floors: {
                terms: {
                    field: "data.tags",
                    order: "_count asc",
                    size:100
                }
        }
        }
    });
    model.aggregations = result.aggregations.floors.buckets;
    return model;
}
