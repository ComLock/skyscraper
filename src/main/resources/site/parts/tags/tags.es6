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
    const model = getModel(req);

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
    const model = {
        partnamespace: libs.partnamespace.getNs(),
        componentUrl: libs.portal.componentUrl({})
    };

    const allTagsResult = queryTags('');
    const filteredTagsResult = queryTags(getSelectedTagsQuery(req));

    const allTags = allTagsResult.aggregations.floors.buckets;
    const filteredTags = filteredTagsResult.aggregations.floors.buckets;

    allTags.forEach(tag => {
        filteredTags.forEach(filteredTag => {
            if (tag.key === filteredTag.key) {
                tag.filterCount = filteredTag.docCount;
            }
        });
    });

    model.allTags = allTags;
    model.allTagsCount = allTags.length;
    model.filteredTagsCount = filteredTags.length;

    return model;
};

const getSelectedTagsQuery = function (req) {
    let query = '';
    let tags = req.params.tags;
    if (tags) {
        tags = tags.split(',');
        tags.forEach(selectedTag => {
            if (selectedTag !== '') {
                if (query !== '') {
                    query += ' AND ';
                }
                query += ` data.tags = '${selectedTag}'`;
            }
        });
    }
    return query;
};

const queryTags = function (query) {
    const q = {
        start: 0,
        query,
        count: 1000,
        contentTypes: [
            'openxp.starter.skyscraper:brick'
        ],
        aggregations: {
            floors: {
                terms: {
                    field: 'data.tags',
                    order: '_count desc',
                    size: 1000
                }
            }
        }
    };
    if (query !== '') {
        q.query = query;
    }
    return libs.content.query(q);
};
