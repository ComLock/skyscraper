let DomParser = require('dom-parser');

let flexboxClient = (function() {
    let listener;

    const init = function() {
        Object.assign(config, window[config.partnamespace]);
        config.partElementSelector = '*[data-partnamespace="'+config.partnamespace+'"]';
        config.partElement = document.querySelector(config.partElementSelector);
        eventListener();
        setSelectedTags();
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

    const loadDoc = function (urlToFetch){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                handleNewBricks(xhttp.responseText)
            }
        };
        xhttp.open("GET", urlToFetch, true);
        xhttp.send();
    };

    const handleNewBricks = function(responseText){
        let parser = new DomParser();
        let dom = parser.parseFromString(responseText);
        let newHtml = dom.getElementById(config.partnamespace);
        let oldHtml = config.partElement;
        if (newHtml && oldHtml && newHtml.innerHTML && oldHtml.innerHTML && !Object.is(newHtml,oldHtml)){
            oldHtml.innerHTML = newHtml.innerHTML;
            setSelectedTags();
        }
    };

    const eventListener = function() {
        eventEmitter.on('clickTag', listener = function(args) {
            let storedTags = JSON.parse(sessionStorage.getItem(config.sessionStorageKey));
            let urlToFetch = config.componentUrl+ '?tags='+storedTags;
            console.log('Fetch from ' + urlToFetch);

            loadDoc(urlToFetch);

        });
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
