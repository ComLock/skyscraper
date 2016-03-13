const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util/util'),
    partnamespace: require('/lib/openxp/partnamespace')
};

exports.get = handleGet;

function handleGet(req) {

    const view = resolve('tags.html');

    let model = getModel();

    const tagsCss = libs.portal.assetUrl({
        path: 'parts/tags/tags.css'
    });

    return {
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                "<link href='" + tagsCss + "' rel='stylesheet' type='text/css'/>",
                libs.partnamespace.getNsScript('parts/tags/tagsClient.js')
            ]
        }
    };
}

const getModel = function(){
    let model = {
        partnamespace: libs.partnamespace.getNs(),
        componentUrl: libs.portal.componentUrl({}),
        updateTagsServiceUrl: libs.portal.serviceUrl({
            service: 'updateTags',
            params: {
                tag: ''
            }
        })
    };

    let content = libs.portal.getContent();

    if (content.type == app.name + ":brick"){
        model.tags = content.data.tags;
        return model;
    }

    let result = libs.content.query({
        start: 0,
        count: 100,
        contentTypes: [
            app.name + ":brick"
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
