const libs = {
    util: require('/lib/enonic/util/util'),
    tags: require('/lib/skyscraper/tags')
};

var counter = 0;

const get = function(req) {
    const params = req.params;
    const tag = params.tag;
    libs.tags.addTag(tag);
    counter++;
    return {
        body: {
            counter: counter,
            tags: libs.tags.getTags()
        },
        contentType: 'application/json'
    };

};

exports.get = get;
exports.post = get;
