'use strict';

module.exports = function () {
    return function (req, res, next) {
        var write = res.write;

        res.write = function (chunk, encoding, callback) {
            var length = res.getHeader('content-length');
            var header = res.getHeader('content-type');

            if (header && header.match(/text\/html/) && chunk) {
                chunk = chunk.toString();
                var origLength = chunk.length;
                chunk = chunk.replace(/<html(.*)manifest=(('|").*?\3)(.*)>/, "<html$1$4>");
                var newLength = chunk.length;

                res.setHeader('content-length', length - (origLength - newLength));
            }

            write.call(res, chunk, encoding, callback);
        };

        next();
    };
};
