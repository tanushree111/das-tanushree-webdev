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
            WidgetService.findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
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
            WidgetService.getWidgetTypes()
                .success(function (widgetTypes) {
                    vm.widgetTypes = widgetTypes;
                });
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
            vm.widget.type = vm.type;
        }

        init();

        function createWidget(widget) {
            if (widget.type) {
                if (widget.type === "HEADING" && !widget.text) {
                    vm.error = "Text field is mandatory for Header widget";
                } else if ((widget.type === "IMAGE" || widget.type === "YOUTUBE") && !widget.url) {
                    vm.error = "URL field is mandatory for Image and Youtube widgets";
                } else {
                    WidgetService.createWidget(vm.pageId, widget)
                        .success(function () {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        })
                        .error(function () {
                            vm.error = "Unable to create widget";
                        });
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
            WidgetService.findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }

        init();

        function updateWidget(widget) {
            if (widget.type) {
                if (widget.type === "HEADER" && !widget.text) {
                    vm.error = "Text field is mandatory for Header widget";
                } else if ((widget.type === "IMAGE" || widget.type === "YOUTUBE") && !widget.url) {
                    vm.error = "URL field is mandatory for Image and Youtube widgets";
                } else {
                    WidgetService.updateWidget(vm.widgetId, widget)
                        .success(function () {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        })
                        .error(function () {
                            vm.error = "Unable to edit widget";
                        });
                }
            } else {
                vm.error = "Widget type unidentified";
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                    vm.error = "Widget could not be deleted";
                });
        }
    }
})();