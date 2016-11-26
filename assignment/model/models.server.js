module.exports = function() {
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://tan:tan111@ds033046.mlab.com:33046/webdevtan';
    /*
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }*/
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