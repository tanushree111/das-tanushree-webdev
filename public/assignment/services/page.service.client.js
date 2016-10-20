(function () {
    angular
        .module('WebAppMaker')
        .factory("PageService", PageService);

    function PageService() {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456" },
                { "_id": "432", "name": "Post 2", "websiteId": "456" },
                { "_id": "543", "name": "Post 3", "websiteId": "456" }
            ];
        var api = {
            "createPage"   : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage

        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            var arr = [...(pages[pages.length - 1]._id)];
            var id="";
            for (var i in arr){
                var valAt = ((parseInt(arr[i])) + 1).toString();
                id = id.concat(valAt.substring(valAt.length - 1));
            }
            page._id = id;
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var websitePages = [];
            for (var pageInd in pages) {
                if(websiteId === pages[pageInd].websiteId){
                    websitePages.push(pages[pageInd]);
                }
            }
            return websitePages;
        }

        function findPageById(pageId) {
            for (var pageInd in pages) {
                if(pageId === pages[pageInd]._id){
                    return pages[pageInd];
                }
            }
        }

        function updatePage(pageId, newPage) {
            for (var pageInd in pages) {
                if(pageId === pages[pageInd]._id){
                    page = Object.assign({}, newPage);
                    return pages[pageInd];
                }
            }
        }

        function deletePage(pageId) {
            var index = pages.indexOf(findPageById(pageId));
            if (index > -1) {
                if(pages.splice(index, 1)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    }

})();