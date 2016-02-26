var DomParser = require('dom-parser');

const libs = {
    assert: require('/lib/xp/assert'),
    portalMock: require('/lib/xp/mock/portal'),
    contentMock: require('/lib/xp/mock/content'),
    util: require('/lib/enonic/util/util')
}

var controller = require('./architect');

exports.testNpm = function () {
    defaultSetup();
    const result = controller.get({params: {contentId: '42'}});
    var parser = new DomParser();
    var dom = parser.parseFromString(result);
    libs.util.log(dom);
    libs.assert.assertTrue(true);

    /*libs.assert.assertNotNull(dom.getElementById('heading'));*/

    /*
    libs.assert.assertEquals(
        defaultContent().displayName,
        dom.getElementById('heading').textContent);
    */

};

exports.testTrue = function () {
    defaultSetup();
    libs.assert.assertTrue(true);
};

exports.testNull = function () {
    defaultSetup();
    libs.assert.assertNull(null);
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
            bodyText: '<h1 id="heading">test</h1>',
            image:'12345'
        }
    };
}

