module.exports = function() {
    var mongoose = require('mongoose');
    //var connectionString = 'mongodb://tan:tan111@ds033046.mlab.com:33046/webdevtan';
    var connectionString = 'mongodb://localhost/wam-fall-2016';

    if(process.env.MONGOLAB_URI) {
        connectionString = process.env.MONGOLAB_URI;
    }
    mongoose.connect(connectionString);
   // mongoose.connect('mongodb://localhost/wam-fall-2016');
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    //userModel.setModel(model);
    //websiteModel.setModel(model);
    return model;
};