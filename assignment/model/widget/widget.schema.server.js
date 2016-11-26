module.exports = function() {
    var mongoose = require("mongoose")
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref:'PageModel'},
        type: {type: String, required: true, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: {type: String, required: true},
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: {type: Number, default: 1},
        size: {type: Number, default: 3},
        class: String,
        icon: String,
        deletable: Boolean,
        formatted:Boolean,
        order: Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});
    return WidgetSchema;
}