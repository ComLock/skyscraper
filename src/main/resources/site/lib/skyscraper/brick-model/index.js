var libs = {
    portal: require('/lib/xp/portal')
};

module.exports.getBrickModel = function (content){

    var model = {
        brick:{
            heading: content.displayName,
            preface: content.data.preface,
            tags: content.data.tags,
            bodyText: libs.portal.processHtml({
                value: content.data.bodyText
            }),
            image: libs.portal.imageUrl({
                id: content.data.image,
                scale: 'height(400)',
                filter: 'rounded(1);sharpen();border(2,0x777777)'
            })
        }
    };
    return model;
};
