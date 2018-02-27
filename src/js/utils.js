let $ = require('jquery');

module.exports = {
    scapeHTML: function (str){
        return $('<div>').text(str).html();
    }
};

