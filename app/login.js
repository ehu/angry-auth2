(function() {
	'use strict';
	angular.module('login', [ 'http-auth-interceptor'])

	.controller('LoginController',  function($scope, $http, authService, GlobalsService) {
		
		//Call this every time its started
		// Should be a login from cookie first, then if that dont work, broadcast a loginRequired
		authService.loginRequired('Login must be done');
		
		$scope.submit = function() {
			
			console.log($scope.username + ' ' + $scope.password );
			
			$http.post( GlobalsService.get('baseUrl') + 'user/authenticate', { username: $scope.username, password: $scope.password })
            
			.success(function (response) {
                console.log(response);
                
                if(response.success) {
                	
                	$http.defaults.headers.common.Authorization = 'Basic ' + response.token64;

                	// Broadcast AND update tokens!
                	authService.loginConfirmed('success', function(config){
                		  config.headers["Authorization"] = 'Basic ' + response.token64;
                		  return config;
                	});

                	
                }
                else {
                	
                	$scope.error = response.message;
                }
			});
		};
	});
})();
