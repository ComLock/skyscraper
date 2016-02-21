const Masonry = require('masonry-layout');

let tags = (function() {
    const init = function() {
        registerTagsClickEvent();
        initMasonry();
    };

    const initMasonry = function() {
        var grid = document.querySelector('.grid-tags');
        var msnry = new Masonry( '.grid-tags', {
            gutter: 2,
            itemSelector: '.grid-item-tag'
        });
    };

    const registerTagsClickEvent = function() {
        let tags = document.getElementById('tags');
        tags.addEventListener('click', handleTagsClick, false);
    };

    var handleTagsClick = function(event) {
        if (event.target !== event.currentTarget) {
            var clickedItem = event.target.id;
            event.target.classList.toggle('selected');
            fetch()
                .then(function(){
                    eventEmitter.emit('clickTag', {
                        id:event.target.id,
                        selected:event.target.classList.contains('selected')
                    });
                })
                .catch(function(){
                    console.log('failed');
                });



        }
        event.stopPropagation();
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', function () {
    tags.init();

});

