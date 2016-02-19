var DomParser = require('dom-parser');

let skyscraper = (function() {

    var init = function() {
        registerClickEvent();
        testParse();
    };

    var testParse = function(parser){
        var parser = new DOMParser();
        var dom = parser.parseFromString("<h1 id='heading'>My great heading</h1>");
        console.log(dom);
        console.log(dom.getElementById("heading").textContent);
    }

    var registerClickEvent = function() {
        var skyscraper = document.getElementById('skyscraper');
        skyscraper.addEventListener('click', function() {
            handleSkyscraperClick(this);
        });
    };

    var handleSkyscraperClick = function(element) {
        element.innerHTML = '<p>clicked</p>';
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', function() {
    skyscraper.init();
});
