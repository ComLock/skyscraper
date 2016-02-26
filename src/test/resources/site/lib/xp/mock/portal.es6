let siteJson = {};
let siteConfigJson = {};
let contentJson = {};
let componentJson = {};

function createUrl(name, params) {
    return `${name}/${JSON.stringify(params)}`;
}

var mock = {
    assetUrl: (params) => {
        return createUrl('asset', params);
    },

    imageUrl: (params) => {
        return createUrl('image', params);
    },

    componentUrl: (params) => {
        return createUrl('component', params);
    },

    attachmentUrl: (params) => {
        return createUrl('attachment', params);
    },

    pageUrl: (params) => {
        return createUrl('page', params);
    },

    serviceUrl: (params) => {
        return createUrl('service', params);
    },

    processHtml: (params) => {
        return `process-${JSON.stringify(params)}`;
    },

    getSite: () => {
        return siteJson;
    },

    getSiteConfig: () => {
        return siteConfigJson;
    },

    getContent: () => {
        return contentJson;
    },

    getComponent: () => {
        return componentJson;
    }
};

exports.mockSite = (json) => {
    siteJson = json;
};

exports.mockSiteConfig = (json) => {
    siteConfigJson = json;
};

exports.mockContent = (json) => {
    contentJson = json;
};

exports.mockComponent = (json) => {
    componentJson = json;
};

__.registerMock('/site/lib/xp/portal.js', mock);