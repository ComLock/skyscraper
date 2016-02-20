var Masonry = require('masonry-layout');

document.addEventListener('DOMContentLoaded', function () {
    var grid = document.querySelector('.grid');

    var msnry = new Masonry( '.grid', {
        gutter: 10,
        itemSelector: '.grid-item'
    });
});