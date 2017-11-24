const libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf')
};

// Handle GET request
exports.get = handleGet;

function handleGet() {
    const component = libs.portal.getComponent();
    const view = resolve('skyscraper-layout.html');
    const model = createModel();

    function createModel() {
        const model = {
            one: component.regions.one,
            two: component.regions.two
        };
        return model;
    }

    return {
        body: libs.thymeleaf.render(view, model)
    };
}
