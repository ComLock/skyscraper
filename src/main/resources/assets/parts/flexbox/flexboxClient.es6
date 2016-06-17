let DomParser = require('dom-parser');

let flexboxClient = (function() {
    let listener;

    const init = function() {
        Object.assign(config, window[config.partnamespace]);
        config.partElementSelector = '*[data-partnamespace="'+config.partnamespace+'"]';
        config.partElement = document.querySelector(config.partElementSelector);
        registerEvents();
        refreshFromSessionStorage();
    };

    const loadDoc = function (urlToFetch){
        fetch(urlToFetch,{credentials: 'same-origin'})
            .then(function(response) {
                return response.text()
            }).then(function(body) {
            handleNewBricks(body);
        });
    };

    const handleNewBricks = function(responseText){
        let parser = new DomParser();
        let dom = parser.parseFromString(responseText);
        let newHtml = dom.getElementById(config.partnamespace);
        let oldHtml = config.partElement;
        if (newHtml && oldHtml && newHtml.innerHTML && oldHtml.innerHTML && !Object.is(newHtml,oldHtml)){
            oldHtml.innerHTML = newHtml.innerHTML;
        }
    };

    const registerEvents = function() {
        eventEmitter.on('clickTag', listener = refreshFromSessionStorage);
        eventEmitter.on('clearTags', listener = refreshFromSessionStorage);
    };

    const refreshFromSessionStorage = function (args){
        let urlToFetch = config.componentUrl;
        let storedTags = JSON.parse(sessionStorage.getItem(config.sessionStorageKey));
        if (storedTags){
            urlToFetch += '?tags='+storedTags;
        }
        loadDoc(urlToFetch);
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', function () {
    flexboxClient.init();
});


/**
 * Current Script Namespace
 *
 * Get the dir path to the currently executing script file
 * which is always the last one in the scripts array with
 * an [src] attr
 */
let config = {};
(function () {
    let scripts = document.querySelectorAll( 'script[src]' );
    let currentScript = scripts[ scripts.length - 1 ];
    config.partnamespace = currentScript.dataset.partnamespacescript;
})();
