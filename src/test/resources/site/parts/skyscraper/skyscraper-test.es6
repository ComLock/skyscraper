var DomParser = require('dom-parser');
var controller = require('./skyscraper.js');

var libs = {
    assert: require('/lib/xp/assert'),
    portalMock: require('/lib/xp/mock/portal'),
    contentMock: require('/lib/xp/mock/content'),
    util: require('/lib/enonic/util/util')
}

exports.testNpm = function () {
    defaultSetup();
    const result = "<html><body><h1 id='heading'>Skyscraper heading</h1></body>";
    var parser = new DomParser();
    var dom = parser.parseFromString(result);
    libs.util.log(dom);
    libs.util.log(dom.getElementById('heading').textContent);
    libs.assert.assertTrue(true);
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
        displayName: 'Skyscraper',
        type: "com.enonic.starter.skyscraper:menuItem",
        data: {
            preface: 'preface',
            bodyText: 'bodytext',
            author: 'author'
        }
    };
}

