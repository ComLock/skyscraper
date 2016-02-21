var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    menu: require('/lib/enonic/menu'),
    util: require('/lib/enonic/util/util')
};

exports.get = handleGet;

function handleGet(req) {
    var site = libs.portal.getSite();
    var content = libs.portal.getContent();
    var view = resolve('skyscraper.html');
    var model = createModel();

    function createModel() {

        var model = {};
        model.mainRegion = content.page.regions['main'];
        model.sitePath = site['_path'];
        model.currentPath = content._path;
        model.pageTitle = content.displayName;
        model.siteName = site.displayName;

        return model;
    }

    const skyscraperScript = libs.portal.assetUrl({
        path: 'pages/skyscraper/skyscraperClient.js'
    });

    const skyscraperCss = libs.portal.assetUrl({
        path: 'pages/skyscraper/skyscraper.css'
    });

    return {
        body: libs.thymeleaf.render(view, model),
        pageContributions: {
            headBegin: [
                "<link href='" + skyscraperCss + "' rel='stylesheet' type='text/css'/>",
                "<script src='" + skyscraperScript + "' type='text/javascript'></script>"
            ]
        }
    };
}