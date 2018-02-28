let $ = require('jquery');
let songsListManager = require('./songs-list-manager');

$('.songs-list').on('click', '.delete-song', function () {
    console.log('Delete song.!');
    let songId = $(this).parent().data('id');
    console.log('Delete song id = ', songId);
    //TODO: implement load to delete song
    $(this).hide();
    songsListManager.delete(songId);
});