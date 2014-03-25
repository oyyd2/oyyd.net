var blogList = angular.module('BlogList',[]);
blogList.controller('BlogListCtrl',function($scope,$http,$window){
    $scope.blogs = [];
    $http.get('/blog/getList').success(function(data){
        console.log(data);
        $scope.blogs = data;
    }).error(function(){
            alert('链接失败！');
        });
    $scope.checkLogin = function(){
		if($window.document.cookie){
			return $window.document.cookie;
		}else{
			return false;
		}
    };
    $scope.deleteBlog = function(data){
        console.log(data);
        $http.post('/blog/delete',data).success(function(res){
            if(res==='success'){
                $window.location.reload();
            }
        }).error(function(){
            console.log('check net.');
        });
    };
});

blogList.directive('blogDelete',function(){
	function link(s,e,a){
		if(!s.checkLogin()){
			e.addClass('hide');
		}
		var clickCount = 0;
		e.click(function(){
			clickCount ++;
			if(clickCount>1){
				var token = s.checkLogin();
				if(token){
					token = token.split('=')[1];
                    s.deleteBlog({
                        token:token,
                        postId:a.blogDelete
                    });
				}
			}
		});
	}
	return{
		link:link
	};
});