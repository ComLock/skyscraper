var DomParser = require('dom-parser');

const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util/util')
};

exports.get = handleGet;
exports.post = handleGet;


function handleGet(req) {
    const view = resolve('architect.html');
    const content = libs.portal.getContent();

    let model = getModel(content);

    //These lines are made for testing, and that just what they do!
    let parser = new DomParser();
    let htmlString = '<html><body><h1 id="heading">Test use of npm lib in controller</h1></body></html>';
    let dom = parser.parseFromString(htmlString);
    libs.util.log(`dom ${dom}`);
    libs.util.log(dom.getElementById('heading').textContent);
    //Test end


    let architectClientScript = '';
    let architectCss = '';


//    architectClientScript = libs.portal.assetUrl({
//        path: 'parts/architect/architectClient.js'
//    });

    architectCss = libs.portal.assetUrl({
        path: 'parts/architect/architect.css'
    });





    return {
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headEnd: [
                "<link href='" + architectCss + "' rel='stylesheet' type='text/css'/>",
                "<script src='" + architectClientScript + "' type='text/javascript'></script>"
            ]
        }
    };
}

const getModel = function(content){
    /*
    let imageUrl = libs.portal.imageUrl({
        id: content.data.image,
        scale: 'height(400)',
        filter: 'rounded(1);sharpen();border(2,0x777777)'
    });

    let bodyHtml = libs.portal.processHtml({
        value: content.data.bodyText
    });*/

    let imageUrl = '';
    let bodyHtml = '<html><body><h1 id="heading">Test</h1></body></html>';

    return {
        architect:{
            heading: content.displayName,
            image: imageUrl,
            preface: content.data.preface,
            bodyText: bodyHtml
        }
    };
}
