module.exports = function() {
    var mongoose = require("mongoose")
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'},
        name: {type: String, required: true},
        title: String,
        description: String,
        //widgets:[Widget],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "page"});
    return PageSchema;
}
