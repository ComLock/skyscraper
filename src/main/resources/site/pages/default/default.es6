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
    var view = resolve('default.html');
    var model = createModel();

    function createModel() {

        var model = {};
        model.mainRegion = content.page.regions['main'];
        model.sitePath = site['_path'];
        model.currentPath = content._path;
        model.pageTitle = 'Default page'
        model.siteName = site.displayName;

        return model;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}