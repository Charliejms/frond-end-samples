let $ = require('jquery');

$('.add-song').on('click', function () {
    $('body').toggleClass('form-show').toggleClass('song-list-show');
});