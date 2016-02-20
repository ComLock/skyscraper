var DomParser = require('dom-parser');
var controller = require('./architect.js');

const libs = {
    assert: require('/lib/xp/assert'),
    portalMock: require('/lib/xp/mock/portal'),
    contentMock: require('/lib/xp/mock/content'),
    util: require('/lib/enonic/util/util')
}

exports.testNpm = function () {
    defaultSetup();
    //const result = controller.get({params: {contentId: '42'}});

    /*
    var parser = new DomParser();
    var dom = parser.parseFromString(result);
    libs.assert.assertEquals(
        defaultContent().displayName,
        dom.getElementById('heading').textContent);
    */
};

function defaultSetup() {
    libs.portalMock.mockSite({});
    libs.portalMock.mockSiteConfig({});
    libs.portalMock.mockContent(defaultContent());
    libs.contentMock.mockQuery({hits: []});
}

function defaultContent() {
    return {
        _id: '42',
        displayName: 'Louis Henry Sullivan',
        type: "com.enonic.starter.skyscraper:architect",
        data: {
            preface: 'Known for the principle of "form follows function"',
            bodyText: '<h1>test</h1>',
            image:'12345'
        }
    };
}

