const libs = {
    util: require('/lib/enonic/util/util')
};

var tags = [];

exports.addTag = function(tag) {
    tags.push(tag);
}

exports.getTags = function(){
    return tags;
}

exports.getTagsQuery = function(){
    return tags;
}