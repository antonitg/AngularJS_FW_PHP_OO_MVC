var loremipsumcars = angular.module('loremipsumcars', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize']);
loremipsumcars.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
                .when("/home", {
                    templateUrl: "module/home/view/view_home.html", 
                    controller: "controller_home",
			        resolve: {
                        homeLoadCat: function (services) {
                            return services.get('home', 'homeLoadCat');
                        },
                        homeLoadSliderProd: function(services) {
                            return services.post('home', 'homeLoadSliderProd');
                        }
                    }
                }).when("/shop", {
                    templateUrl: "module/shop/view/view_shop.html", 
                    controller: "controller_shop",
                    resolve: {
                        loadFilters: function (services) {
                            return services.get('shop', 'loadFilters');
                        }
                    }
			    }).when('/logreg' , {
                    templateUrl: "module/logreg/view/view_logreg.html",
                    controller: "controller_logreg",
					resolve: {
                        verifyAcc: function () {
                            return false;
                        }
                    }
				}).when('/logreg/verify/:verifyToken' , {
                    templateUrl: "module/logreg/view/view_logreg.html",
                    controller: "controller_logreg",
			        resolve: {
                        verifyAcc: function (services, $route) {
                            return services.post('logreg', 'verify', {'token': $route.current.params.verifyToken});
                        }
                    }
				}).when('/logreg/recover/:verifyToken' , {
                    templateUrl: "module/logreg/view/view_logregRecover.html",
                    controller: "controller_logregRecover",
                }).otherwise("/home", {
                    templateUrl: "frontend/module/home/view/view_home.html", 
                    controller: "controller_home"
                });
    }]);
loremipsumcars.factory('services_search', ['$rootScope', 'services', function($scope, services) {
    let service = {search: search, brand: brand, user:user};
    return service;
	function user() {
		 if (localStorage.getItem("token") == undefined) {
			 $scope.user="Guest";				
			 return;
		}
		services.post('search', 'getUser', {token: localStorage.getItem("token")})
			.then(function(response){
				$scope.user=response;				
			}, function(error) {
				console.log(error+"asdad");
			});
	}
	function brand() {
		conditioncar = $(".select-condition-search").val();
		services.post('search', 'getBrandsSearch', {condition: conditioncar})
			.then(function(response){
				$scope.brandSearch=response;				
			}, function(error) {
			});
	}
	function search() {
		if ($(".generalSearchInput").val() == "%") {
			$scope.autcomp=null;
			return;
		}
		if ($(".generalSearchInput").val() == "") {
			$scope.autcomp=null;
			return;
		}
		if ($(".generalSearchInput").val() == undefined) {
			$scope.autcomp=null;
			return;
		}
		services.post('search', 'getAutocompleteSearch', {keyword: $(".generalSearchInput").val(), condition: $(".select-condition-search").val(), brand: $(".select-brand-search").val()})
			.then(function(response){
				if (response.length == undefined) {
					response = [response];
					if (!response[0].model) {
						$scope.autcomp=null;
						return;
					}
				}
				$scope.autcomp=response;				
			}, function(error) {
				console.log(error+"asdad");
			});
	}
}]);//
loremipsumcars.run(function($rootScope, services, services_search, services_logreg){
	$rootScope.busc = function(carPlate) {
		services_search.search();
	};
	$rootScope.loadSearchFilters = function() {
		services_search.brand();
	};
	$rootScope.logout = function() {
		  localStorage.removeItem('token');
    	  window.location.href = "#logreg";
		  window.location.reload(true);
	};
	$rootScope.redirectSearch = function(brand) {
		localStorage.setItem('action', 'brand');
		localStorage.setItem('value', brand);
		window.location.href = "#shop";
		$(".generalSearchInput").val("");
	};
	angular.element(document).ready(function () {
			services_search.brand();
			services_search.user();
    });

});

