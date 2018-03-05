let $ = require('jquery');
const baseUrl = 'http://localhost:8000/api';

module.exports = {

    save: function (song, successCallback, errorCallback) {
        let formData = new FormData();
        formData.append('artist', song.artist);
        formData.append('title', song.title);
        formData.append('audio_url', song.audio_file);

        if (song.cover_file) formData.append('cover_url', song.cover_file);
        else formData.append('cover_url', "");
        $.ajax({
            url: "http://localhost:8000/api/songs/",
            method: "post",
            data: formData,
            processData: false,
            contentType: false,
            success: successCallback,
            error: errorCallback,
        });
    },
    list: function (successCallback, errorCallback) {
        $.ajax({
            url: `${baseUrl}/songs`,
            method: "get",
            success: successCallback,
            error: errorCallback,
        });
    },
    detail: function (songId, successCallback, errorCallback) {
        $.ajax({
            url: `${baseUrl}/songs/${songId}`,
            method: 'get',
            success: successCallback,
            error: errorCallback
        });
    },
    update: function (song, songId, successCallback, errorCallback) {
        $.ajax({
            url: `${baseUrl}/songs/${songId}`,
            method: 'put',
            success: successCallback,
            error: errorCallback
        });
    },
    delete: function (songId, successCallback, errorCallback) {
        $.ajax({
            url: `${baseUrl}/songs/${songId}`,
            method: "delete",
            success: successCallback,
            error: errorCallback,
        });
    }
};