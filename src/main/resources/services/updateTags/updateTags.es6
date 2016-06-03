const libs = {
    util: require('/lib/enonic/util/util')
};

var counter = 0;

const get = function(req) {
    const params = req.params;
    const tag = params.tag;
    counter++;
    return {
        body: {
            counter: counter
        },
        contentType: 'application/json'
    };

};

exports.get = get;
exports.post = get;
