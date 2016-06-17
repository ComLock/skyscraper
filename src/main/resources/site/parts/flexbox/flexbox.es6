const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util/util'),
    content: require('/lib/xp/content'),
    partnamespace: require('/lib/openxp/partnamespace'),
    jsonPath: require('/lib/openxp/jsonpath'),
    brickModel: require('/lib/skyscraper/brick-model')
};

exports.get = handleGet;

function handleGet(req) {
    let query = '';
    let tags = req.params.tags;
    if (tags) {
        tags = tags.split(",");
        tags.forEach(selectedTag => {
            if (selectedTag!==''){
                if (query!==''){
                    query+=" AND ";
                }
                query += " data.tags = '" +  selectedTag + "'";
            }
        });
    }
    const view = resolve('flexbox.html');
    const bricks = libs.content.query({
        start: 0,
        count: 1000,
        query: query,
        contentTypes: [
            "openxp.starter.skyscraper:brick"
        ]
    });

    let model = getModel(bricks);

    let html =libs.thymeleaf.render(view, model);

    return {
        contentType: 'text/html',
        body: html,
        pageContributions: {
            headEnd: [
                libs.partnamespace.getNsScript('parts/flexbox/flexboxClient.js')
            ]
        }
    }
}



const getModel = function (bricks) {
    let model = {
        partnamespace: libs.partnamespace.getNs(),
        componentUrl: libs.portal.componentUrl({}),
        bricks: []
    };

    bricks.hits.forEach(element => model.bricks.push(libs.brickModel.getBrickModel(element).brick));

    return model;
};
