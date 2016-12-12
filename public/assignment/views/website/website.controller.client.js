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
            WebsiteService.findWebsitesByUser(vm.userId)
            .success(function(websites){
                vm.websites = websites;
            })
                .error(function(){
                    vm.error = "Unable to fetch websites";
                });;
        }
        init();
    }


    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            if(website && website.name) {
                WebsiteService.createWebsite(vm.userId, website)
                    .success(function(){
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function(){
                        vm.error = "Unable to create website";
                    });

                }
            else{
                vm.error = "Website name is mandatory";
            }
        }

        function init() {
             WebsiteService.findWebsitesByUser(vm.userId)
                .success(function(websites){
                vm.websites = websites;
            });
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
            if(website && website.name) {
                WebsiteService.updateWebsite(vm.websiteId, website)
                    .success(function(){
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function(){
                        vm.error = "Unable to edit website";
                    });
            }else{
                vm.error = "Website name is mandatory";
            }
        }

        function deleteWebsite() {
                WebsiteService.deleteWebsite(vm.websiteId)
                    .success(function(){
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function(){
                        vm.error = "Website could not be deleted";
                    });
        }

        function init() {
            WebsiteService.findWebsitesByUser(vm.userId)
            .success(function(websites){
                vm.websites = websites;
            });

            WebsiteService.findWebsiteById(vm.websiteId)
            .success(function(website){
                vm.website = website;
            });
        }
        init();

    }
})();