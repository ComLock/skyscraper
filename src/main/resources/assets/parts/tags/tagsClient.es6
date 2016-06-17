let DomParser = require('dom-parser');

let tagsClient = (function() {

    const init = function() {

        //Add inline script config from part to config object
        Object.assign(config, window[config.partnamespace]);
        config.partElementSelector = '*[data-partnamespace="'+config.partnamespace+'"]';
        config.partElement = document.querySelector(config.partElementSelector);
        config.loadingSelector = config.partElementSelector + ' .loading';

        registerTagsClickEvent();
        initSelectedTags();
    };

    const initSelectedTags = function(){
        let storedTags = JSON.parse(sessionStorage.getItem(config.sessionStorageKey));
        let tagElements = config.partElement.querySelectorAll('.tag');
        if (!storedTags || !tagElements){return;}

        for (let i = 0; i < tagElements.length; i++){
            if (storedTags.indexOf(tagElements[i].id)!==-1){
                tagElements[i].checked = true;
            }
        }
    };

    const registerTagsClickEvent = function() {
        config.partElement.addEventListener('click', handleTagsClick, false);
    };

    const handleNewTags = function(responseText){
        let parser = new DomParser();
        let dom = parser.parseFromString(responseText);
        let newHtml = dom.getElementById(config.partnamespace);
        let oldHtml = config.partElement.querySelector("#"+config.partnamespace);
        if (newHtml && oldHtml && newHtml.innerHTML && oldHtml.innerHTML && !Object.is(newHtml,oldHtml)){
            oldHtml.innerHTML = newHtml.innerHTML;
        }
        initSelectedTags();
    };

    const loadDoc = function (urlToFetch){
        let loadingElement = config.partElement.querySelector(config.loadingSelector);
        loadingElement.classList.toggle("hidden");
        const activeElementId = document.activeElement.id;
        fetch(urlToFetch,{credentials: 'same-origin'})
            .then(function(response) {
                return response.text()
            }).then(function(body) {
            handleNewTags(body);
            let activeElement = config.partElement.querySelector("#"+activeElementId);
            activeElement.focus();
        });


    };

    var handleTagsClick = function(event) {
        if (event.target !== event.currentTarget && event.target.tagName=="INPUT") {
            let clickedItemId = event.target.id;
            event.target.classList.toggle('selected');
            var existingTags = sessionStorage.getItem(config.sessionStorageKey);
            let storedTags;
            if (!existingTags){//Handle first clicked tag
                sessionStorage.setItem(config.sessionStorageKey, JSON.stringify([clickedItemId]));
                storedTags = [clickedItemId];
            }else{
                storedTags = JSON.parse(existingTags);
                if (storedTags.indexOf(clickedItemId)===-1){//add new tag
                    storedTags.push(clickedItemId);
                }else{//remove tag
                    for (let i = 0; i < storedTags.length; i++){
                        if (storedTags[i]===clickedItemId){
                            storedTags.splice(i,1);
                        }
                    }
                }
                sessionStorage.setItem(config.sessionStorageKey, JSON.stringify(storedTags));
            }

            loadDoc(config.componentUrl+ '?tags='+storedTags);

            eventEmitter.emit('clickTag', {
                id:clickedItemId,
                selected:event.target.classList.contains('selected'),
                sessionStorageKey: config.sessionStorageKey
            });

        }
        event.stopPropagation();
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', function () {
    tagsClient.init();
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
    config.partnamespace = currentScript.dataset.partnamespacescript;
})();

