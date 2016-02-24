var Masonry = require('masonry-layout');
var DomParser = require('dom-parser');

let architects = (function() {
    let listener;
    let config;
    const init = function() {
        console.log('init');
        config = window.com_enonic_starter_skyscraper_architectsConfig;
        initMasonry();
        eventListener();
        setSelectedTags();
    };

    const initMasonry = function() {
        var grid = document.querySelector(config.componentId + ' .grid-architects');
        var msnry = new Masonry( '.grid-architects', {
            gutter: 10,
            itemSelector: '.grid-item-architect'
        });
    };

    const setSelectedTags = function(){
        let storedTags = JSON.parse(sessionStorage.getItem(config.sessionStorageKey));
        let tagElements = document.querySelectorAll('#' + config.componentId + ' .tag');
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
            fetch(config.componentUrl+ '?tags='+storedTags, {
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
                let newHtml = dom.getElementById(config.componentId);
                let oldHtml = document.getElementById(config.componentId);
                if (newHtml.innerHTML && !Object.is(newHtml,oldHtml)){
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
    console.log('DOMContentLoaded architectsClient');
    architects.init();
});