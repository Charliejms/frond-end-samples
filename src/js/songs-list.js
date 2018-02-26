let $ = require('jquery');
// show list songs
$.ajax({
    url: "http://localhost:3004/api/songs",
    success : function (response) {
        response.map(song => {
            console.log(song);
            let html =`    
                        <article class="song">
                            <img  class="cover" src="${song.cover_url}">
                            <div class="artist">${song.artist}</div>
                            <div class="title">${song.title}</div>
                        </article>`;

            $('.songs-list').append(html);
        });

    },
    error: function (response) {
        console.log('error: ',response )
    }

});