(function () {
    angular
        .module('WebAppMaker')
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites =
            [
                { "_id": "123", "name": "Facebook",    "developerId": "456" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
                { "_id": "678", "name": "Checkers",    "developerId": "123" },
                { "_id": "789", "name": "Chess",       "developerId": "234" }
            ];
        var api = {
            "createWebsite"   : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite

        };
        return api;

        function createWebsite(userId, website) {
            website.developerId = userId;
            var arr = [...(websites[websites.length - 1]._id)];
            var id="";
            for (var i in arr){
                var valAt = ((parseInt(arr[i])) + 1).toString();
                id = id.concat(valAt.substring(valAt.length - 1));
            }
            website._id = id;
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId) {
            var userWebsites = [];
            for (var wInd in websites) {
                if(userId === websites[wInd].developerId){
                    userWebsites.push(websites[wInd]);
                }
            }
            return userWebsites;
        }

        function findWebsiteById(websiteId) {
            for (var wInd in websites) {
                if(websiteId === websites[wInd]._id){
                    return websites[wInd];
                }
            }
        }

        function updateWebsite(websiteId, newWebsite) {
            for (var wInd in websites) {
                if(websiteId === websites[wInd]._id){
                    websites[wInd] = Object.assign({}, newWebsite);
                    return websites[wInd];
                }
            }
        }

        function deleteWebsite(websiteId) {
            var index = websites.indexOf(findWebsiteById(websiteId));
            if (index > -1) {
                if(websites.splice(index, 1)){
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