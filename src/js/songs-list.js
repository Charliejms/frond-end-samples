let $ = require('jquery');
let utils = require('./utils');

module.exports = {
    load: function () {
        // show list songs
        $.ajax({
            url: "http://localhost:3004/api/songs",
            success : function (response) {
                $('.songs-list').html(''); //clean songs list
                response.map(song => {
                    console.log(song);
                    let html =`    
                        <article class="song">
                            <img  class="cover" src="${song.cover_url}">
                            <div class="artist">${utils.scapeHTML(song.artist)}</div>
                            <div class="title">${utils.scapeHTML(song.title)}</div>
                        </article>`;

                    $('.songs-list').append(html);
                });

            },
            error: function (response) {
                console.log('error: ',response )
            }
        });
    }
};