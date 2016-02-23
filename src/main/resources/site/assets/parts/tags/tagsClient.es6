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
            let clickedItem = event.target.id;
            event.target.classList.toggle('selected');
            var tags = sessionStorage.getItem("tags");
            console.log('existing tags ' + tags);
            if (!tags){
                tags = [];
                tags[0] = event.target.id;
                sessionStorage["tags"] = JSON.stringify(tags);
            }else{
                let storedTags = sessionStorage["tags"];
                storedTags = JSON.parse(storedTags);
                console.log("storedTags"+storedTags);

                let existingIndex = storedTags.indexOf(event.target.id);
                if (existingIndex!==-1) {
                    console.log("Existing tag " + storedTags[existingIndex]);
                }

                console.log(storedTags);
                console.log(storedTags.length);
                console.log("index1235: " + existingIndex);

                storedTags += ","+event.target.id;
                sessionStorage["tags"] = JSON.stringify(storedTags);
                console.log("storedTags:" + storedTags);

            }

            localStorage.setItem("tags", event.target.id);
            fetch(
                window.__com_enonic_starter_skyscraper_tags_main_0_UpdateTagsServiceUrl + event.target.id,
                {
                    method: 'get'
                }
            )
            .then(function(response){
                if (response.status !== 200) {
                    console.log('Failed. Status Code: ' + response.status);
                    return;
                }
                response.json().then(function(data) {
                    console.log(data);
                    eventEmitter.emit('clickTag', {
                        id:event.target.id,
                        selected:event.target.classList.contains('selected')
                    });
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

