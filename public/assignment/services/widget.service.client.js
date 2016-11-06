(function () {
    angular
        .module('WebAppMaker')
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes,
            "sortWidgets": sortWidgets

        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, newWidget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, newWidget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);
        }

        function getWidgetTypes() {
            var url = "/api/widgetTypes";
            return $http.get(url);
        }

        function sortWidgets(initial, final, pageId) {
            var url = "/api/page/pageId/widget?initial=INITIAL&final=FINAL";
            url = url
                .replace("pageId", pageId)
                .replace("INITIAL", initial)
                .replace("FINAL", final);
            return $http.put(url);
        }
    }

})();