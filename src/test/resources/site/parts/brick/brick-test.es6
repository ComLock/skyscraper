var DomParser = require('dom-parser');

const libs = {
    assert: require('/lib/xp/assert'),
    portalMock: require('/lib/xp/mock/portal'),
    contentMock: require('/lib/xp/mock/content'),
    util: require('/lib/enonic/util/util')
}

var controller = require('./brick.js');

exports.testBrickPartContenttype = function () {
    defaultSetup();
    const result = controller.get();
    libs.assert.assertEquals(result.contentType, "text/html");
};

exports.testBrickPartHasHeading = function () {
    defaultSetup();
    const result = controller.get();
    var parser = new DomParser();
    var dom = parser.parseFromString(result.body);
    libs.assert.assertNotNull(dom.getElementById('heading'));
};

exports.testBrickPartCorrectHeading = function () {
    defaultSetup();
    const result = controller.get();
    var parser = new DomParser();
    var dom = parser.parseFromString(result.body);
    libs.assert.assertEquals(
        getMockedContent().displayName,
        dom.getElementById('heading').textContent);
};

function defaultSetup() {
    libs.portalMock.mockSite({});
    libs.portalMock.mockSiteConfig({});
    libs.portalMock.mockContent(getMockedContent());
    libs.contentMock.mockQuery({hits: []});
}

function getMockedContent() {
    return {
        _id: '42',
        displayName: 'Louis Henry Sullivan',
        type: "com.enonic.starter.skyscraper:brick",
        data: {
            preface: 'Known for the principle of "form follows function"',
            bodyText: '<h1 id="heading">test</h1>',
            image:'12345'
        }
    };
}

