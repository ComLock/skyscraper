var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf')
};

// Handle GET request
exports.get = handleGet;

function handleGet() {
    var component = libs.portal.getComponent();
    var view = resolve('skyscraper-layout.html');
    var model = createModel();

    function createModel() {
        var model = {
            one: component.regions["one"],
            two: component.regions["two"]
        };
        return model;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}