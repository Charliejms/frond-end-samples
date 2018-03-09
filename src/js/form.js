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

    let inputs = $('.new-song-form').find('input, .drop-zone');
    for (let i = 0;  i<inputs.length; i++){
        let input = inputs[i];
        if(input.checkValidity() === false){
            alert(input.validationMessage);
            input.focus();
            return false;
        }
    }
    let audio_file_input = $('#audio_file')[0];
    let audio_file = null;
    if(audio_file_input.file !== null){
        audio_file = audio_file_input.file;
        console.log(audio_file);

    }
    let cover_file_input = $('#cover_file')[0];
    let cover_file = null;
    if (cover_file_input.file !== null){
        cover_file = cover_file_input.file;
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

//disable behavior by default open file in browser
$('body').on('drop dragover', function () {
    event.preventDefault();
    return false;

});

let drop_zone = $('.drop-zone');
//management event drag and drop
drop_zone.on('dragover dragleave', function (event) {
    event.preventDefault();
    let self = $(this);
    if (event.type ==='dragover'){
        self.addClass('drop-here');
    }else {
        self.removeClass('drop-here');
    }
});

drop_zone.on('drop', function (event) {
    let files = event.originalEvent.dataTransfer.files;
    if (files.length > 0){
        console.log('file selected: ', files[0])
        let file = files[0];
        $(this).text(file.name);
        this.file = file; // create a attribute files in the drop-zone
        this.setAttribute('custom','loren ipsum')
        //TODO: Create validate type:
    }
    event.preventDefault();
    return false;
}).each(function () {
    let self = this;
    this.file = null;
    this.validationMessage= 'Invalid file type';
    this.checkValidity = function () {
        let regexp = $(self).attr('datatype');
        let required = $(self).attr('required');
        if (required === 'required'){
            //TODO : create check a validate require drop zone and reset form
            console.log('hey i am required');

        }
        return self.file !== null && self.file.type.match(regexp);
    };

});
