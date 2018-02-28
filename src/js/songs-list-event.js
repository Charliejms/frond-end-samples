let $ = require('jquery');
let songsListManager = require('./songs-list-manager');

$('.songs-list').on('click', '.delete-song', function () {
    console.log('Delete song.!');
    let songId = $(this).parent().data('id');
    console.log('Delete song id = ',songId);
    $.ajax({
        url: `http://localhost:3004/api/songs/${songId}`,
        method: "delete",
        success : function () {
            console.log('Song deleted!');
            songsListManager.load();
        },
        error: function (response) {
            console.log('Error delete song', response)
        }
    });
});