var DomParser = require('dom-parser');

var libs = {
    assert: require('/lib/xp/assert'),
    portalMock: require('/lib/xp/mock/portal'),
    contentMock: require('/lib/xp/mock/content'),
    util: require('/lib/enonic/util/util')
};

var controller = require('./skyscraper');

function defaultSetup() {
    libs.portalMock.mockSite({});
    libs.portalMock.mockSiteConfig({});
    libs.portalMock.mockContent(getMockedContent());
}

exports.testSkyscraperPartContenttype = function () {
    defaultSetup();
    var result = controller.get();
    libs.assert.assertEquals('text/html', result.contentType);
};


var getMockedContent = function(){
    return {
        _id: '42',
        page:{
            regions: {
                main: {
                    components: [
                        {
                            name: 'Tags',
                            path: 'main/0',
                            type: 'part',
                            descriptor: 'com.enonic.starter.skyscraper:tags',
                            config: {}
                        },
                        {
                            name: 'Architects',
                            path: 'main/1',
                            type: 'part',
                            descriptor: 'com.enonic.starter.skyscraper:architects',
                            config: {}
                        }
                    ],
                    name:'main'
                }
            }
        }
    }
};