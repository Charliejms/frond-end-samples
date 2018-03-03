let $ = require('jquery');
let songsListManager = require('../songs-list-manager');
let apiClientSong = require('../api/song-api-client');

//TODO: Create a edit song view.
$('.songs-list').on('click','.edit-song', function () {
    let self = $(this);
    $('body').toggleClass('form-show').toggleClass('song-list-show');
    $('form').addClass('edit-song-form');
    let songId = self.parent().data('id');
    $("#artist").data('id', songId);
    apiClientSong.detail(songId, function (song) {
        let songResponse = {
            id: $("#artist").parent().data('id', 'element'),
            artist: $("#artist").val(song.artist),
            title: $('#title').val(song.title),
            audio_url: $('#audio_url').val(song.audio_url),
            cover_url: $('#cover_url').val(song.cover_url)
        };
        console.log($("#artist").parent().data('id', 'element'));


    }, function () {
        alert('Error while update song.')
    })
});

$('.edit-song-form').on('submit',function () {
    console.log('hey bro;');
    let inputs = $('.new-song-form input');
    for (let i = 0;  i<inputs.length; i++){
        let input = inputs[i];
        if(input.checkValidity() === false){
            alert(input.validationMessage);
            input.focus();
            return false;
        }
    }
    let song = {
        artist: $("#artist").val(),
        title: $('#title').val(),
        audio_url: $('#audio_url').val(),
        cover_url: $('#cover_url').val()
    };
    //update Song
    apiClientSong.update(song, songId, function () {
        songsListManager.load();
    },function () {
        console.log('ERROR', arguments);
    });
    return false; // == e.preventDefault()
});
