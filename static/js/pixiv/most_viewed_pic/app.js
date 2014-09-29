var mostViewedPic = angular.module('mostViewedPic',[]);
mostViewedPic.controller('mostViewedPicController',['$scope','$http',function($s,$http){
  $s.pics = [];
  $http.get('/pixiv/api/service/most_ranked').success(function(res){
    $s.pics = res.top_10;
    console.log($s.pics);
  }).error(function(){
    alert('fail');
  });
}]);