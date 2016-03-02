var routerApp = angular.module('routerApp',['ui.router']);
routerApp.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/index');
	$stateProvider
		.state('index',{
			url : '/index',
			views :{
				'':{
					templateUrl : 'page/index.html'
				},
				'topbar@index' :{
					templateUrl : 'page/topbar.html'
				},
				'main@index' : {
					templateUrl : 'page/home.html'
				}
			}
		})
		.state('index.usermng',{
			url :'/usermng',
			views : {
				'main@index' :{
					templateUrl : 'page/usermng.html',
					controller : function($scope,$state){
						$scope.addUserType =function(){
							$state.go("index.usermng.addusertype");
						}
					}
				}
			}
		})
		.state('index.usermng.highendusers',{
			url : '/highendusers',
			templateUrl : 'page/highendusers.html'
		})
		.state('index.usermng.normalusers',{
			url : '/normalusers',
			templateUrl : 'page/normalusers.html'
		})
		.state('index.usermng.lowusers',{
			url: '/lowusers',
			templateUrl : 'page/lowusers.html'
		})
		.state('index.usermng.addusertype',{
			url : '/addusertype',
			templateUrl : 'page/addusertypeform.html',
			controller : function($scope,$state){
				$scope.backToPrevious = function(){
					window.history.back();
				}
			}
		})
		
})
routerApp.factory('ListService',['$http',
	function($http){
		var doReuqest =function(url){
			return $http({
				method : 'GET',
				url : "json/"+url
			});
		}
		return {
			userList : function(url){
				return doReuqest(url);
			}
		}
	}
])
routerApp.controller('ServiceController1',['$scope','ListService',
	function($scope,ListService){
		ListService.userList("users.json")
		.success(function(data,status){
			$scope.users =data;
		})
	}
])
routerApp.controller('gaoduanController',['$scope','ListService',
	function($scope,ListService){
		ListService.userList("json.json")
		.success(function(data,status){
			$scope.list =data;
		})
	}
])
routerApp.filter('KG',function(){
	return function(item){
		return item+'.00 KG';
	}
})
routerApp.filter('$',function(){
	return function(item){
		return item+'元';
	}
})
routerApp.controller('shop',['$scope',function($scope){
	$scope.json=[{id:1,name:'短袖',num:5,jiage :80},{id:2,name:'衬衣',num:2,jiage :150}];
	$scope.zongjia = function(){
		var zongjia = 0;
		angular.forEach($scope.json,function(val){
			zongjia += val.num * val.jiage;
		})
		return zongjia;
	}
	$scope.zongnum = function(){
		var zongnum = 0;
		angular.forEach($scope.json,function(val){
			zongnum += val.num;
		})
		return zongnum;
	}
	$scope.yichu = function(id){
		var xiabiao = 0;
		xiabiao = $scope.chaObject(id);
		$scope.json.splice(xiabiao,1);
		$scope.kong();
	}
	$scope.qingchu = function(){
		$scope.json = {};
		$scope.kong();
	}
	$scope.kong = function(){
		var length = $scope.json.length;
		if(!length){
			$scope.show = true;
		}
	}
	$scope.chaObject = function(id){
		var obj=0;
		angular.forEach($scope.json,function(val,i){
			if(val.id == id){
				obj=i;
			}
		})
		return obj;

	}
	$scope.numjia = function(id){
		var obj=$scope.chaObject(id); 
		++$scope.json[obj].num;
	}
	$scope.numjian = function(id){
		var obj=$scope.chaObject(id); 
		if($scope.json[obj].num >0){
			--$scope.json[obj].num;
		}
		
	}
	$scope.show = false;


}]);
routerApp.controller('yonghu',['$scope',function($scope){
	$scope.json = [
		{
			id : 1,
			name : '行政总监',
			date : '2016-03-01 13:02:10'
		},
		{
			id : 2,
			name : '项目主管',
			date : '2016-02-01 13:02:10'
		},
		{
			id : 3,
			name : '测试工程师',
			date : '2016-01-01 13:02:10'
		}
	];
	$scope.chaObject = function(id){
		var index =0;
		angular.forEach($scope.json,function(val,i){
			if(val.id == id){
				index=i;
			}
		})
		return index;
	}
	$scope.remove = function(id){
		var i=$scope.chaObject(id);
		$scope.json.splice(i,1);
	}
	$scope.sousuo ="";
	var watch = $scope.$watch('sousuo',function(){
		alert(1);
		
	});
}]);