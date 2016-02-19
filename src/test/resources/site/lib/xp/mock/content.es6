var getJson = {};
var queryJson = {};

var mock = {
    get: function(params) {
        return getJson;
    },

    query: function(params) {
        return queryJson;
    }
};

exports.mockGet = function(json) {
    getJson = json;
};

exports.mockQuery = function(json) {
    queryJson = json;
};

__.registerMock('/site/lib/xp/content.js', mock);
