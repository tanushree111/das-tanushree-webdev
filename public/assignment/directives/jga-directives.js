(function(){
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable(){
        function linker(scope, element, attributes){
            var initial = -1;
            var final = -1;

            element
                .sortable({
                start: function(event, ui){
                    initial = $(ui.item).index();
                },
                stop: function(event, ui){
                    final = $(ui.item).index();
                    var pageId = scope.$parent.model.pageId;
                    scope.jgaSortableController.sort(initial, final, pageId);
                }
            });
        }

        return{
            scope:{},
            link: linker,
            controller: jgaSortableController,
            controllerAs: 'jgaSortableController'
        }
    }


    function jgaSortableController(WidgetService){
        var vm = this;
        vm.sort = sort;

        function sort(initial, final, pageId){
            WidgetService.sortWidgets(initial, final, pageId);
        }
    }
})();