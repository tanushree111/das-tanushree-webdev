(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }


    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            if(website.name) {
                website = WebsiteService.createWebsite(vm.userId, website);
                if (website) {
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.error = "Unable to create website";
                }
            }else{
                vm.error = "Website name is mandatory";
            }
        }

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            if(website.name) {
                website = WebsiteService.updateWebsite(vm.websiteId, website);
                if (website) {
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.error = "Unable to edit website";
                }
            }else{
                vm.error = "Website name is mandatory";
            }
        }

        function deleteWebsite() {
            if(WebsiteService.deleteWebsite(vm.websiteId)){
                $location.url("/user/" + vm.userId + "/website");
            }else{
                vm.error = "Website could not be deleted";
            }
        }

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

    }
})();