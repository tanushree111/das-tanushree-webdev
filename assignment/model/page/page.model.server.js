module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findPageById: findPageById,
        updatePage: updatePage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        deletePage: deletePage
    };
    return api;

    function createPage(wid, page){
        return PageModel.create(page)
            .then(function(pageObj){
                pageObj._website = wid;
                pageObj.save();
            });
    }

    function findPageById(pageId){
        return PageModel.findById(pageId);
    }

    function findAllPagesForWebsite(websiteId){
        return PageModel.find( //use alternatively findOne
            {
                _website: websiteId
            });
    }

    function updatePage(pageId, page){
        return PageModel.update(
            {
                _id: pageId
            },
            {
                name: page.name,
                title: page.title,
                description: page.description
            });
    }

    function deletePage(pageId){
        return PageModel.remove(
            {
                _id: pageId
            });
    }
}