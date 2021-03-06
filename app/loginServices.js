(function() {
	'use strict';
	angular.service('loginServices',  ['http-auth-interceptor', '$http','$location','$cookieStore','$rootScope',
	                                  function($http,$location,$cookieStore,$rootScope) {
		
		
		 this.tryLoginFromCookie = function(){

			 var authToken = $cookieStore.get('authToken');
			 var username = $cookieStore.get('username');
	         
			 if (authToken === undefined) {
				 $rootScope.currentUserSignedIn = false;
				 authService.loginRequired();
				 return;
	         }
			 else {
				 $rootScope.username = username;
				 $rootScope.authToken = authToken;
				 $rootScope.currentUserSignedIn = true;
				 authService.loginConfirmed('success', function(config){
					 $http.defaults.headers.common.Authorization = 'Basic ' + authToken;
					 config.headers["Authorization"] = 'Basic ' + authToken;
					 return config;
				 });
			 }

		 };
		
	}])
	});