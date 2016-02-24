const Masonry = require('masonry-layout');

let com_enonic_starter_skyscraper_tagsClient = (function() {

    let config;
    const init = function() {
        config = window.com_enonic_starter_skyscraper_tagsConfig;
        registerTagsClickEvent();
        initMasonry();
        initSelectedTags();
    };

    const initMasonry = function() {
        var grid = document.querySelector(config.componentId + ' .grid-tags');
        var msnry = new Masonry( '.grid-tags', {
            gutter: 2,
            itemSelector: '.grid-item-tag'
        });
    };

    const initSelectedTags = function(){
        let storedTags = JSON.parse(sessionStorage.getItem(config.sessionStorageKey));
        let tagElements = document.querySelectorAll('#' + config.componentId + ' .tag');
        if (!storedTags || !tagElements){return;}

        for (let i = 0; i < tagElements.length; i++){
            if (storedTags.indexOf(tagElements[i].id)!==-1){
                tagElements[i].classList.add('selected');
            }
        }
    };

    const registerTagsClickEvent = function() {
        let tags = document.getElementById(config.componentId);
        tags.addEventListener('click', handleTagsClick, false);
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
    com_enonic_starter_skyscraper_tagsClient.init();

});

