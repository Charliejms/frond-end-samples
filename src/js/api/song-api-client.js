let $ = require('jquery');
const baseUrl = 'http://localhost:3004/api';

module.exports = {

    save: function (song, successCallback, errorCallback) {
        $.ajax({
            url: "http://localhost:3004/api/songs/",
            method: "post",
            data: song,
            success: successCallback,
            error: errorCallback,
        });
    },
    delete: function (songId, successCallback, errorCallback) {
        $.ajax({
            url: `${baseUrl}/songs/${songId}`,
            method: "delete",
            success: successCallback,
            error: errorCallback,
        });
    },
    list: function (songId, successCallback, errorCallback) {
        $.ajax({
            url: `${baseUrl}/songs`,
            method: "get",
            success: successCallback,
            error: errorCallback,
        });
    }
};