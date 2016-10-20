(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("ChooseWidgetController", ChooseWidgetController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();

        function checkSafeYoutubeUrl(url) {
            var parts = url.split("/");
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }

    function ChooseWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        function init() {
            vm.widgetTypes = WidgetService.getWidgetTypes();
        }

        init();
    }

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.type = $routeParams["type"];
        vm.createWidget = createWidget;

        function init() {
            vm.widget = {};
            vm.widget.widgetType = vm.type;
        }

        init();

        function createWidget(widget) {
            if (widget.widgetType) {
                if (widget.widgetType === "HEADER" && !widget.text) {
                    vm.error = "Text field is mandatory for Header widget";
                } else if ((widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") && !widget.url()) {
                    vm.error = "URL field is mandatory for Image and Youtube widgets";
                } else {
                    widget = WidgetService.createWidget(vm.pageId, widget);
                    if (widget) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    } else {
                        vm.error = "Unable to create widget";
                    }
                }
            } else {
                vm.error = "Widget type unidentified";
            }
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.widgetId = $routeParams["wgid"];
        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function updateWidget(widget) {
            if (widget.widgetType) {
                if (widget.widgetType === "HEADER" && !widget.text) {
                    vm.error = "Text field is mandatory for Header widget";
                } else if ((widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") && !widget.url()) {
                    vm.error = "URL field is mandatory for Image and Youtube widgets";
                } else {
                    widget = WidgetService.updateWidget(vm.widgetId, widget);
                    if (widget) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    } else {
                        vm.error = "Unable to edit widget";
                    }
                }
            } else {
                vm.error = "Widget type unidentified";
            }
        }

        function deleteWidget() {
            if (WidgetService.deleteWidget(vm.widgetId)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Widget could not be deleted";
            }
        }
    }
})();