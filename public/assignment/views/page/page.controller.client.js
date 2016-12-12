(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages =  pages;
                });
        }
        init();
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;

        function createPage(page) {
            if(page && page.name) {
                PageService.createPage(vm.websiteId, page)
                        .success(function(){
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        })
                        .error(function(){
                            vm.error = "Unable to create page";
                        });

                }
            else{
                vm.error = "Page name is mandatory";
            }
        }

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                vm.pages =  pages;
            });
        }
        init();
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            if(page && page.name) {
                PageService.updatePage(vm.pageId, page)
                    .success(function(){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                    .error(function(){
                    vm.error = "Unable to edit page";
                    });

            }else{
                vm.error = "Page name is mandatory";
            }
        }

        function deletePage() {

            PageService.deletePage(vm.pageId)
                .success(function(){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            })
                .error(function(){
                    vm.error = "Page could not be deleted";
                });
        }

        function init() {

            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages =  pages;
                });
            PageService.findPageById(vm.pageId)
                .success(function(page){
                    vm.page =  page;
                });

        }
        init();

    }
    /////
})();