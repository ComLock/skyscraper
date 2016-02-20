var DomParser = require('dom-parser');

let skyscraper = (function() {

    var init = function() {
        registerClickEvent();
        testParse();
    };

    var testParse = function(){
        const result = "<html><body><h1 id='heading'>My awezome heading</h1></body>";
        var parser = new DomParser();
        var dom = parser.parseFromString(result);
        console.log(dom);
        console.log(dom.getElementById("heading").textContent);
    }

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
