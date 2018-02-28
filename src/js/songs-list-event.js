let $ = require('jquery');
let apiClientSong = require('./api/song-api-client');

$('.songs-list').on('click', '.delete-song', function () {
    let self = $(this);
    let songId = self.parent().data('id');
    //TODO: implement load to delete song
    self.hide();
    console.log('this',this);
    //songsListManager.delete(songId);
    apiClientSong.delete(songId,function () {
        self.parent().remove();
    }, function (response) {
        alert('Error while deleting the song.')
    })
});