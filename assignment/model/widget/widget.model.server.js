module.exports = function() {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        deleteWidget: deleteWidget,
        findWidgetTypes:findWidgetTypes,
        reorderWidget:reorderWidget
    };
    return api;

    function createWidget(pid, widget){
        return WidgetModel.create(widget)
            .then(function(widgetObj){
                widgetObj._page = pid;
                widgetObj.save();
            });
    }

    function findWidgetById(widgetId){
        return WidgetModel.findById(widgetId);
    }

    function findAllWidgetsForPage(pageId){
        return WidgetModel.find( //use alternatively findOne
            {
                _page: pageId
            }).sort('order');
    }

    function updateWidget(widgetId, widget){
        return WidgetModel.update(
            {
                _id: widgetId
            },
            {
                name: widget.name,
                description: widget.description,
                text: widget.text,
                placeholder: widget.placeholder,
                url: widget.url,
                width: widget.width,
                height: widget.height,
                rows: widget.rows,
                size: widget.size,
                class: widget.class,
                icon: widget.icon,
                deletable: widget.deletable,
                formatted:widget.formatted
            });
    }

    function deleteWidget(widgetId){
        return WidgetModel.remove(
            {
                _id: widgetId
            });
    }

    function findWidgetTypes(){
        return WidgetModel.schema.path('type').enumValues;
    }

    function reorderWidget(pageId, start, end){
        return findAllWidgetsForPage(pageId)
            .then(function(pageWidgets){
                pageWidgets.splice(end, 0, pageWidgets.splice(start, 1)[0]);
                for(wgid in pageWidgets){
                    pageWidgets[wgid].order = parseInt(wgid) + 1;
                    pageWidgets[wgid].save();
                }

            });

    }

}