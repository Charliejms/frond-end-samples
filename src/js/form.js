const $ = require('jquery');
let songsList = require('./songs-list');

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
    let song = {
        artist: $("#artist").val(),
        title: $('#title').val(),
        audio_url: $('#audio_url').val(),
        cover_url: $('#cover_url').val()
    };
    console.log('Click button');
    $.ajax({
        url: "http://localhost:3004/api/songs/",
        method: "post",
        data: song,
        beforeSend: function () {
            $(inputs).attr("disable", true); // disable inputs
            $('.new-song-form button').text('Saving song...').attr('disable', true) // disable button
        },
        success: function (response) {
            console.log("SUCCESS", response);
            $('form')[0].reset(); //clean fields form
            $("#artist").focus(); // show focus at artist textfield
            songsList.load();
        },
        error: function () {
            console.log("ERROR", arguments)
        },
        complete: function () {
            $(inputs).attr("disable", false); // disable inputs
            $('.new-song-form button').text('Save song').attr('disable', false)
        }

    });
    return false; // == e.preventDefault()
});