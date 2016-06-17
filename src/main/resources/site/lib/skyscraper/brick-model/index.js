var libs = {
    portal: require('/lib/xp/portal')
};

module.exports.getBrickModel = function (content){

    var model = {
        brick:{
            heading: content.displayName,
            image: libs.portal.imageUrl({
                id: content.data.image,
                scale: 'width(250)',
                filter: 'rounded(1);'
            })
        }
    };
    
    if (content.data.preface){
        model.brick.preface = content.data.preface;

    }
    if (content.data.tags){
        model.brick.tags = content.data.tags;
    }
    if (content.data.bodyText){
        model.brick.bodyText = libs.portal.processHtml({
            value: content.data.bodyText
        })
    }
    return model;
};
