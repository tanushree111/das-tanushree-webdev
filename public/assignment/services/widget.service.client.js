(function () {
    angular
        .module('WebAppMaker')
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets =
            [
                {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                {
                    "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"
                },
                {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                {
                    "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E"
                },
                {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];
        var widgetTypes =
            [
                {"widgetType": "HEADER"},{"widgetType": "LABEL"},{"widgetType": "HTML"},{"widgetType": "TEXT INPUT"},
                {"widgetType": "LINK"},{"widgetType": "BUTTON"},{"widgetType": "IMAGE"},{"widgetType": "YOUTUBE"},
                {"widgetType": "DATA TABLE"},{"widgetType": "REPEATER"}
            ];
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "getWidgetTypes": getWidgetTypes

        };
        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            var arr = [...(widgets[widgets.length - 1]._id)];
            var id="";
            for (var i in arr){
                var valAt = ((parseInt(arr[i])) + 1).toString();
                id = id.concat(valAt.substring(valAt.length - 1));
            }
            widget._id = id;
            //Defaulting size of header to 3 if not provided.
            if(widget.widgetType === "HEADER" && !widget.size){
                widget.size = 3;
            }
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            var pageWidgets = [];
            for (var wgInd in widgets) {
                if (pageId === widgets[wgInd].pageId) {
                    pageWidgets.push(widgets[wgInd]);
                }
            }
            return pageWidgets;
        }

        function findWidgetById(widgetId) {
            for (var wgInd in widgets) {
                if (widgetId === widgets[wgInd]._id) {
                    return widgets[wgInd];
                }
            }
        }

        function updateWidget(widgetId, newWidget) {
            for (var wgInd in widgets) {
                if (widgetId === widgets[wgInd]._id) {
                    widgets[wgInd] = Object.assign({}, newWidget);
                    return widgets[wgInd];
                }
            }
        }

        function deleteWidget(widgetId) {
            var index = widgets.indexOf(findWidgetById(widgetId));
            if (index > -1) {
                if(widgets.splice(index, 1)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }

        function getWidgetTypes() {
            return widgetTypes;
        }
    }

})();