'use strict';

var rewrite = require('connect-body-rewrite');

module.exports = function () {
    return rewrite({
        accept: function (res) {
            return res.getHeader('content-type').match(/text\/html/);
        },
        rewrite: function (body) {
            return body.replace(/<html(.*)manifest=(('|").*?\3)(.*)>/, "<html$1$4>");
        }
    });
};
