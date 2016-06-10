require('../../server-polyfills.es6');

const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util/util'),
    partnamespace: require('/lib/openxp/partnamespace')
};

exports.get = handleGet;

function handleGet(req) {

    const view = resolve('tagz.html');
    let model = getModel(req);

    return {
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                libs.partnamespace.getNsScript('parts/tags/tagsClient.js')
            ]
        }
    };
}

const getModel = function (req) {
    let model = {
        partnamespace: libs.partnamespace.getNs(),
        componentUrl: libs.portal.componentUrl({})
    };

    let allTagsResult = queryTags('');
    let filteredTagsResult = queryTags(getSelectedTagsQuery(req));

    let allTags = allTagsResult.aggregations.floors.buckets;
    let filteredTags = filteredTagsResult.aggregations.floors.buckets;

    allTags.forEach(tag => {
        filteredTags.forEach(filteredTag => {
           if (tag.key === filteredTag.key){
               tag.filterCount = filteredTag.docCount;
           }
        });
    });

    model.allTags = allTags;
    model.allTagsCount = allTags.length;
    model.filteredTagsCount = filteredTags.length;

    return model;
};

const getSelectedTagsQuery = function(req){
    let query = '';
    let selectedTags = req.params.tags;
    if (selectedTags) {
        selectedTags = selectedTags.replace(',', ' ');
        query = "fulltext('data.tags', '" + selectedTags + "', 'AND')";
    }
    return query;
};

const queryTags = function(query){
    return libs.content.query({
        start: 0,
        query: query,
        count: 1000,
        contentTypes: [
            "openxp.starter.skyscraper:brick"
        ],
        aggregations: {
            floors: {
                terms: {
                    field: "data.tags",
                    order: "_count desc",
                    size: 1000
                }
            }
        }
    });
};
