const $ = require('jquery');

$('.new-song-form button').on('click', function () {

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
        success: function (response) {
            console.log("SUCCESS", response);
            $('form')[0].reset(); //clean fields form
            $("#artist").focus(); // show focus at artist textfield
        },
        error: function () {
            console.log("ERROR", arguments)
        }

    });
    return false; // == e.preventDefault()
});