var getJson = {};
var queryJson = {};

var mock = {
    get: () => getJson,
    query: () => queryJson
};

exports.mockGet = function(json) {
    getJson = json;
};

exports.mockQuery = function(json) {
    queryJson = json;
};

__.registerMock('/lib/xp/content.js', mock);
