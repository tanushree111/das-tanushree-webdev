module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var model={};

    var api = {
        createWebsite: createWebsite,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function createWebsite(userId, website){
        return WebsiteModel.create(website)
            .then(function(websiteObj){
                websiteObj._user = userId;
                websiteObj.save();
            });
    }

    function findWebsiteById(websiteId){
        return WebsiteModel.findById(websiteId);
    }

    function findAllWebsitesForUser(userId){
        return WebsiteModel.find({
            _user : userId
        });
    }

    function updateWebsite(websiteId, website){
        return WebsiteModel.update(
            {
                _id: websiteId
            },
            {
                name: website.name,
                description: website.description
            });
    }

    function deleteWebsite(websiteId){
        return WebsiteModel.remove(
            {
                _id: websiteId
            });
    }
}