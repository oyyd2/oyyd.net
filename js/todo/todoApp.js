var app = angular.module('todoList',[]);

app.controller('todoCtrl',function($scope,$http,$window){	
	$scope.title = 'todoList';
	$scope.todos = [];
	$http.get('/todo/getList').success(function(todos){
		console.log(todos);
		$scope.todos = todos;
	}).error(function(){
		alert('请检查网络连接');
	});
	$scope.checkoutTodo = function(event){
		var todoId = event.currentTarget.attributes['data-todoId'].value;
		$http.get('/todo/checkoutTodo?todoId='+todoId).success(function(data){
			$window.location.reload();
			console.log(data);
		}).error(function(){
			alert('请检查网络连接');
		});
	};
}).directive('todoIsChecked',function(){
	function link(s,e,a){
		if(a.todoIsChecked=='1'){
			e.find('p.todoContent').css('text-decoration','line-through');
			e.find('.checkoutBtn').hide();
		}
	}
	return {
		link:link
	};
});

app.controller('submitTodo',function($scope,$http,$window){
	$scope.content = '';
	$scope.submitTodo = function(){
		if($scope.content===''){
			alert('null');
			return;
		}
		$http.get('/todo/addTodo?content='+$scope.content+'&token='+$window.document.cookie.split('=')[1]).success(function(data){
			$window.location.reload();
			console.log(data);
		}).error(function(){
			alert('请检查网络连接');
		});
	};
});