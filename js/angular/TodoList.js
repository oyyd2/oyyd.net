var todoListApp = angular.module('TodoList',[]);

todoListApp.controller('todoListCtrl',['$scope',function($scope){
    $scope.items = [];
    $scope.editedItem = '';
    $scope.addItem = function($event){
        if($event.keyCode==13 && $scope.editedItem){
            $scope.items.push({
                content:$scope.editedItem,
                isChecked:false
            });
            $scope.editedItem = '';
        }
    };
    $scope.isAllChecked = false;
    $scope.toggleAll = function(){
        var goalStatus = false;
        if(!$scope.isAllChecked){
            goalStatus = false;
        }else{
            goalStatus = true;
        }
        $scope.isAllChecked = goalStatus;
        angular.forEach($scope.items,function(value,key){
            value.isChecked = goalStatus;
        });
    }
    $scope.checkAllChecked = function(currentValue){
        if(!currentValue){
            $scope.isAllChecked = false;
        }else{
            var isAllChecked = true;
            angular.forEach($scope.items,function(value,key){
                if(!value.isChecked){
                    isAllChecked = false;
                }
            });
            $scope.isAllChecked = isAllChecked;
        }
    }
}]).directive('itemCount',function(){
        function link(scope,element,attrs){
            scope.$watch(function(scope){
                return scope.items.length;
            },function(value){
                if(value>0){
                    element.css({
                        'display':'inline-block'
                    });
                }else{
                    element.css({
                        'display':'none'
                    })
                }
            });
        }
        return{
            link:link
        }
    });