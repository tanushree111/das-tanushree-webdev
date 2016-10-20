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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;

        function createPage(page) {
            if(page.name) {
                page = PageService.createPage(vm.websiteId, page);
                if (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.error = "Unable to create page";
                }
            }else{
                vm.error = "Page name is mandatory";
            }
        }

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
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
            if(page.name) {
                page = PageService.updatePage(vm.pageId, page);
                if (page) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.error = "Unable to edit page";
                }
            }else{
                vm.error = "Page name is mandatory";
            }
        }

        function deletePage() {
            if(PageService.deletePage(vm.pageId)){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }else{
                vm.error = "Page could not be deleted";
            }
        }

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

    }
    /////
})();