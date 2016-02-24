var Masonry = require('masonry-layout');

let architects = (function() {
    let listener;
    let config;
    const init = function() {
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
            let sessionStorageKey = args.sessionStorageKey;
            var storedTags = JSON.parse(sessionStorage.getItem(sessionStorageKey));
            console.log('Update architects based on tags: ' + storedTags);
            fetch(config.componentUrl, {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: 'tags=french'
            })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                console.log(response);
                console.log(response.body);
                //document.getElementById(config.componentId).innerHTML = response.body;

            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
            setSelectedTags();
        });
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', function () {
    architects.init();
});