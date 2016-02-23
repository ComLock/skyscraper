var Masonry = require('masonry-layout');

let architects = (function() {
    let listener;
    const init = function() {
        initMasonry();
        eventListener();
    };

    const initMasonry = function() {
        var grid = document.querySelector('.grid-architects');
        var msnry = new Masonry( '.grid-architects', {
            gutter: 10,
            itemSelector: '.grid-item-architect'
        });
    };

    const eventListener = function() {
        eventEmitter.on('clickTag', listener = function(args) {
            console.log(`you clicked tag ${args.id}. Selected? ${args.selected}`);
            let storedTags = sessionStorage["tags"];
            console.log("storedTags:" + storedTags);

        });
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', function () {
    architects.init();
});