'use strict';
const assets = require('./webpack.assets.js').assets;
const styles = require('./webpack.styles.js').styles;
const site = require('./webpack.site.js').site;

module.exports =
    [
        assets(),
        styles(),
        site()
    ];
//console.log(`module.exports:${JSON.stringify(module.exports, null, 2)}`);
