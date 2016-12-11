module.exports = function() {
    var mongoose = require("mongoose")
    //var WebsiteSchema = require("../website/website.schema.server")();

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        url: String,
        //websites:[{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        //websites:[WebsiteSchema],
        dateCreated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: "user"});

    return UserSchema;
}