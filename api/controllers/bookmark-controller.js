var mongoose = require('mongoose'),
    bookmarkSchema = require('../schemas/bookmark-schema');

mongoose.connect(process.env.MONGOLAB_URI);

var Bookmark = mongoose.model('Bookmark', bookmarkSchema);

var app = global.app;

var get = function(req, res) {
    Bookmark.find(function(err, bookmarks) {
        if (bookmarks.length > 0) {
            res.send(bookmarks[0]);
        } else {
            res.send({});
        }
    });
}

var post = function(req, res) {
    //id is static for now
    Bookmark.findOne({
        id: 12345
    }, function(err, doc) {
        if (doc) {
            doc.childrens = req.body.childrens;
            doc.save();
        } else {
            var bookmark = new Bookmark(req.body);
            bookmark.save();
        }
        res.status(200).send("success");
    });

}

module.exports = {
    get: get,
    post: post
}