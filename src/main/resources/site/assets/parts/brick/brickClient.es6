var DomParser = require('dom-parser');

let skyscraper = (function() {

    var init = function() {
        registerClickEvent();
    };

    var registerClickEvent = function() {
        var skyscraper = document.getElementById('architect');
        skyscraper.addEventListener('click', function() {
            handleSkyscraperClick(this);
        });
    };

    var handleSkyscraperClick = function(element) {
        console.log('clicked architect');
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', function() {
    skyscraper.init();
});
