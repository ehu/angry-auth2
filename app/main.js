(function() {
  'use strict';
  angular.module('fnlf-auth', [
    'http-auth-interceptor',
    //'content-mocks',
    'login',
    'content',
    'ngRoute', 
    'ngCookies',
	'angular-loading-bar', 
	'ui.bootstrap'
  ])
  /**
   * This directive will find itself inside HTML as a class,
   * and will remove that class, so CSS will remove loading image and show app content.
   * It is also responsible for showing/hiding login form.
   */
  .directive('authDemoApplication', function($rootScope) {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        //once Angular is started, remove class:
        elem.removeClass('waiting-for-angular');
        
        
        $rootScope.currentUserSignedIn = true;
        
        scope.$on('event:auth-loginRequired', function() {
        	$rootScope.error = 'Login is required';
        	$rootScope.currentUserSignedIn = false;
        });
        scope.$on('event:auth-loginConfirmed', function() {
        	$rootScope.currentUserSignedIn = true;
        });
        
        
      }
    }
  })
  // Loading bar config
.config([ 'cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeBar = true;
	cfpLoadingBarProvider.includeSpinner = false;
}])
.controller('LoginModalController', function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'views/login-help.tmpl.html',
        controller: 'LoginModalInstanceController',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })
  .controller('LoginModalInstanceController', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .factory('GlobalsService',
	    ['$cookieStore', '$rootScope',
	    function ($cookieStore, $rootScope) {
	    	
	    	var configs = {baseUrl : 'http://localhost/remoteapi/v1/'};
	    	
	    	var service = {};

	        service.get = function (key) {
	        	
	        	return configs[key];
	        };

	        return service;
	    	
	    }])



;




})();