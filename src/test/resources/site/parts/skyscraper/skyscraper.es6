var DomParser = require('dom-parser');
var controller = require('./skyscraper.js');

var libs = {
    assert: require('/lib/xp/assert'),
    portalMock: require('/lib/xp/mock/portal'),
    contentMock: require('/lib/xp/mock/content'),
    util: require('/lib/enonic/util/util')
}

exports.testNpm = function () {
    const result = "<html><body><h1 id='heading'>My awezome heading</h1></body>";
    var parser = new DomParser();
    var dom = parser.parseFromString(result);
    libs.util.log(dom);
    libs.util.log(dom.getElementById('heading').textContent);
    libs.assert.assertTrue(true);
};

