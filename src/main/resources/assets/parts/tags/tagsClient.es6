let DomParser = require('dom-parser');


function getExistingTags(toggleTagWithId) {
    var existingTags = sessionStorage.getItem(config.sessionStorageKey);
    if (toggleTagWithId === undefined){
        return JSON.parse(existingTags);
    }

    let storedTags;
    if (!existingTags) {//Handle first clicked tag
        sessionStorage.setItem(config.sessionStorageKey, JSON.stringify([toggleTagWithId]));
        storedTags = [toggleTagWithId];
    } else {
        storedTags = JSON.parse(existingTags);
        if (storedTags.indexOf(toggleTagWithId) === -1) {//add new tag
            storedTags.push(toggleTagWithId);
        } else {//remove tag
            for (let i = 0; i < storedTags.length; i++) {
                if (storedTags[i] === toggleTagWithId) {
                    storedTags.splice(i, 1);
                }
            }
        }
        sessionStorage.setItem(config.sessionStorageKey, JSON.stringify(storedTags));
    }
    return storedTags;
}

let tagsClient = (function() {
    let listener;
    const init = function() {
        //Add inline script config from part to config object
        Object.assign(config, window[config.partnamespace]);
        config.partElementSelector = '*[data-partnamespace="'+config.partnamespace+'"]';
        config.partElement = document.querySelector(config.partElementSelector);
        config.loadingSelector = config.partElementSelector + ' .loading';

        registerEvents();
        refreshFromSessionStorage();
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

    const registerEvents = function() {
        config.partElement.addEventListener('click', handleClick, false);
        eventEmitter.on('clearTags', listener = refreshFromSessionStorage);
    };

    const refreshFromSessionStorage = function(args){
        const existingTags = getExistingTags();
        if (existingTags){
            loadDoc(config.componentUrl + '?tags='+existingTags);
        }else{
            loadDoc(config.componentUrl);
        }
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
            if (activeElement){
                activeElement.focus();
            }
        });
    };

    var handleClick = function(event) {
        if (event.target !== event.currentTarget && event.target.tagName=="INPUT") {
            clickedTag();
        }else if (event.target.classList.contains('clearTags')){
            sessionStorage.removeItem(config.sessionStorageKey);
            eventEmitter.emit('clearTags', {});
        }

        function clickedTag() {
            event.target.classList.toggle('selected');
            let clickedItemId = event.target.id;
            var storedTags = getExistingTags(clickedItemId);

            loadDoc(config.componentUrl + '?tags=' + storedTags);

            eventEmitter.emit('clickTag', {
                id: clickedItemId,
                selected: event.target.classList.contains('selected'),
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

