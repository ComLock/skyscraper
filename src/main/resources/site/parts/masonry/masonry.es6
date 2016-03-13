const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util: require('/lib/enonic/util/util'),
    content: require('/lib/xp/content'),
    partnamespace: require('/lib/openxp/partnamespace'),
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
    const view = resolve('masonry.html');

    const bricks= libs.content.query({
        start: 0,
        count: 100,
        query: query,
        contentTypes: [
            app.name + ":brick"
        ]
    });

    let model = getModel(bricks);


    const masonryCss = libs.portal.assetUrl({
        path: 'parts/masonry/masonry.css'
    });

    return {
        contentType: 'text/html',
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                "<link href='" + masonryCss + "' rel='stylesheet' type='text/css'/>",
                libs.partnamespace.getNsScript('parts/masonry/masonryClient.js')
            ]
        }
    }
}

const getModel = function(bricks){
    //let pageComponents = libs.jsonPath.process(libs.portal.getContent(), '$..components.*');

    let model = {
        partnamespace: libs.partnamespace.getNs(),
        componentUrl: libs.portal.componentUrl({}),
        bricks:[]
    };

    bricks.hits.forEach(function(element,index,array){
        model.bricks.push(
            {
                heading: element.displayName,
                image: libs.portal.imageUrl({
                    id: element.data.image,
                    scale: 'width(200)',
                    filter: 'rounded(1);sharpen();border(2,0x777777)'
                }),
                preface: element.data.preface,
                tags: element.data.tags
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
