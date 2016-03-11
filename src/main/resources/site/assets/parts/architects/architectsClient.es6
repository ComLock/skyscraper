var Masonry = require('masonry-layout');
var DomParser = require('dom-parser');

let architects = (function() {
    let listener;

    const init = function() {
        Object.assign(config, window[config.partnamespace+'_Config']);
        config.partElement = document.getElementById(config.partnamespace);
        initMasonry();
        eventListener();
        setSelectedTags();
    };

    const initMasonry = function() {
        var grid = config.partElement.querySelector('.grid-architects');
        var msnry = new Masonry( '.grid-architects', {
            gutter: 10,
            itemSelector: '.grid-item-architect'
        });
    };

    const setSelectedTags = function(){
        let storedTags = JSON.parse(sessionStorage.getItem(config.sessionStorageKey));
        let tagElements = config.partElement.querySelectorAll('.tag');
        if (!storedTags || !tagElements){return;}

        for (let i = 0; i < tagElements.length; i++){
            if (storedTags.indexOf(tagElements[i].textContent.toLowerCase())!==-1){
                tagElements[i].classList.add('selected');
            }else{
                tagElements[i].classList.remove('selected');
            }
        }
    };

    const eventListener = function() {
        eventEmitter.on('clickTag', listener = function(args) {
            var storedTags = JSON.parse(sessionStorage.getItem(config.sessionStorageKey));
            let fetchUrl = config.componentUrl+ '?tags='+storedTags;
            console.log('Fetch from ' + fetchUrl);
            fetch(fetchUrl, {
                method: 'get'
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                if (!text){
                    return;
                }
                var parser = new DomParser();
                var dom = parser.parseFromString(text);
                let newHtml = dom.getElementById(config.partnamespace);
                let oldHtml = config.partElement;
                if (newHtml && oldHtml && newHtml.innerHTML && oldHtml.innerHTML && !Object.is(newHtml,oldHtml)){
                    oldHtml.innerHTML = newHtml.innerHTML;
                    initMasonry();
                    setSelectedTags();
                }

            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
        });
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', function () {
    architects.init();
});


/**
 * Current Script Namespace
 *
 * Get the dir path to the currently executing script file
 * which is always the last one in the scripts array with
 * an [src] attr
 */
var config = {};
(function () {
    var scripts = document.querySelectorAll( 'script[src]' );
    var currentScript = scripts[ scripts.length - 1 ];
    config.partnamespace = currentScript.dataset.enonicnamespacescript;
})();
