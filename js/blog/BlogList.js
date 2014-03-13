var blogList = angular.module('BlogList',[]);
blogList.controller('BlogListCtrl',function($scope,$http){
    $scope.blogs = [];
    $http.get('/blog/getList').success(function(data){
        console.log(data);
        $scope.blogs = data;
    }).error(function(){
            alert('链接失败！');
        });
});