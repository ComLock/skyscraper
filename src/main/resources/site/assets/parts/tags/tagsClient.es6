const Masonry = require('masonry-layout');

let tagsClient = (function() {

    const init = function() {

        //Add inline script config from part to config object
        Object.assign(config, window[config.partnamespace]);
        config.partElementSelector = '*[data-partnamespace="'+config.partnamespace+'"]';
        config.partElement = document.querySelector(config.partElementSelector);

        registerTagsClickEvent();
        initMasonry();
        initSelectedTags();
    };

    const initMasonry = function() {
        var grid = config.partElement.querySelector('.grid-tags');
        var msnry = new Masonry( '.grid-tags', {
            gutter: 2,
            itemSelector: '.grid-item-tag'
        });
    };

    const initSelectedTags = function(){
        let storedTags = JSON.parse(sessionStorage.getItem(config.sessionStorageKey));
        let tagElements = config.partElement.querySelectorAll('.tag');
        if (!storedTags || !tagElements){return;}

        for (let i = 0; i < tagElements.length; i++){
            if (storedTags.indexOf(tagElements[i].id)!==-1){
                tagElements[i].classList.add('selected');
            }
        }
    };

    const registerTagsClickEvent = function() {
        console.log('Add click listener to ' + config.partElement);
        config.partElement.addEventListener('click', handleTagsClick, false);
    };

    var handleTagsClick = function(event) {
        if (event.target !== event.currentTarget) {
            let clickedItemId = event.target.id;
            event.target.classList.toggle('selected');
            var existingTags = sessionStorage.getItem(config.sessionStorageKey);


            if (!existingTags){//Handle first clicked tag
                sessionStorage.setItem(config.sessionStorageKey, JSON.stringify([clickedItemId]));
            }else{
                let storedTags = JSON.parse(existingTags);
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

