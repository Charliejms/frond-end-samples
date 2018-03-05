const $ = require('jquery');
let songsListManager = require('./songs-list-manager');
let apiClientSong = require('./api/song-api-client');

function setLoading(inputs) {
    $(inputs).attr("disable", true); // disable inputs
    $('.new-song-form button').text('Saving song...').attr('disable', true) // disable button
}
function unSetLoading(inputs) {
    $(inputs).attr("disable", false); // enable inputs
    $('.new-song-form button').text('Save song').attr('disable', false)
}

$('.new-song-form').on('submit', function () {

    let inputs = $('.new-song-form input');
    for (let i = 0;  i<inputs.length; i++){
        let input = inputs[i];
        if(input.checkValidity() === false){
            alert(input.validationMessage);
            input.focus();
            return false;
        }
    }
    let audio_file_input = $('#audio_file');
    let audio_file = null;
    if(audio_file_input[0].files.length > 0){
        audio_file = audio_file_input[0].files[0];
        console.log(audio_file);

    }
    let cover_file_input = $('#cover_file');
    let cover_file = null;
    if (cover_file_input[0].files.length > 0){
        cover_file = cover_file_input[0].files[0];
    }

    let song = {
        artist: $("#artist").val(),
        title: $('#title').val(),
        audio_file: audio_file,
        cover_file: cover_file
    };
    setLoading(inputs); // enable form
    //Create song
    apiClientSong.save(song, function (response) {
        console.log("SUCCESS", response);
        $('form')[0].reset(); //clean fields form
        $("#artist").focus(); // show focus at artist textfield
        songsListManager.load();
        unSetLoading(inputs);
    }, function () {
        console.log("ERROR", arguments);
        unSetLoading(inputs);
    });
    return false; // == e.preventDefault()
});

// detecting inputs file
$('input[type="file"]').on('change', function () {
    let reader = new FileReader();
    reader.onload = function (event) {
        console.log(arguments)
    };
    reader.readAsDataURL(this.files[0])
});