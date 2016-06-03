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
        tags = tags.replace(',', ' ');
        query = "fulltext('data.tags', '" + tags + "', 'AND')";
    }
    const view = resolve('flexbox.html');

    const bricks = libs.content.query({
        start: 0,
        count: 100,
        query: query,
        contentTypes: [
            app.name + ":brick"
        ]
    });

    let model = getModel(bricks);


    const masonryCss = libs.portal.assetUrl({
        path: 'parts/flexbox/flexbox.css'
    });

    const stylesJs = libs.portal.assetUrl({
        path: 'styles.js'
    });


    return {
        contentType: 'text/html',
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                //"<link href='" + masonryCss + "' rel='stylesheet' type='text/css'/>",
                //libs.partnamespace.getNsScript('parts/flexbox/flexboxClient.js'),
                "<script src='"+stylesJs+"' type='javascript'/>",
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

    bricks.hits.forEach(element => {
        log.info('%s',element);
        model.bricks.push(libs.brickModel.getBrickModel(element).brick);
    });

    return model;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
