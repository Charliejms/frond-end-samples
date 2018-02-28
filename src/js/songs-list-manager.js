let $ = require('jquery');
let utils = require('./utils');
let apiClientSong = require('./api/song-api-client');

const STATIC_FILES = {
    cover_url: 'https://assets.capitalxtra.com/2017/49/lil-pump-instagram-7-1512392223-view-1.png',
    audio_url: 'https://someurl.com'
};

module.exports = {
    load: function () {
        // show list songs
        apiClientSong.list(function (response) {
            $('.songs-list').html(''); //clean songs list
            response.map(song => {
                let song_id = song.id || "";
                let artist = song.artist || "";
                let title = song.title || "";
                let cover_url = song.cover_url || "";
                let audio_url = song.audio_url || "";
                if (cover_url === "" || audio_url === ""){
                    cover_url = STATIC_FILES.cover_url;
                    audio_url = STATIC_FILES.audio_url;
                }

                let html =`    
                        <article class="song" data-id="${song_id}">
                            <img  class="cover" src="${cover_url}">
                            <i class="delete-song" title="like song"></i>
                            <div class="artist">${utils.scapeHTML(artist)}</div>
                            <div class="title">${utils.scapeHTML(title)}</div>
                        </article>`;

                $('.songs-list').append(html);
            });

        },function (response) {
            console.log('error: ',response )
        });
    }
};