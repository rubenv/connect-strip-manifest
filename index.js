'use strict';

module.exports = function () {
    return function (req, res, next) {
        var end = res.end;

        res.end = function (body, encoding) {
            var header = res.getHeader('content-type');

            if (header && header.match(/text\/html/) && body) {
                body = body.replace(/<html(.*)manifest=(('|").*?\3)(.*)>/, "<html$1$4>");
                if (res.data !== undefined && !res._header) {
                    res.setHeader('content-length', Buffer.byteLength(body, encoding));
                }
            }
            end.call(res, body, encoding);
        };
        next();
    };
};
