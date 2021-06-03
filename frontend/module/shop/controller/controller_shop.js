loremipsumcars.controller('controller_shop', function($scope, services, loadFilters, services_shop) {
	$scope.loadFilters = loadFilters;
	$scope.showDetails = function(carPlate) {
		services_shop.details(carPlate);
		$scope.showcar = true;
		$scope.showcars = false;

	};
	$scope.checkInsurance = function(ins) {
		if (ins == 1){
			return true;
		} else {
			return false;
		};
	};
	$scope.fav = function() {
		services_shop.addFav(this.car.registration);
		this.car.registrationfav = 1;
		console.log(this.car);
	};
	$scope.unfav = function() {
		services_shop.rmFav(this.car.registration);
		this.car.registrationfav = null;
	};
	$scope.addInsurance = function(carPlate) {
		services_shop.addInsurance(carPlate);
	};
	$scope.rmInsurance = function(carPlate) {
		services_shop.rmInsurance(carPlate);
	};
	$scope.checkout = function() {
		services_shop.checkout();
	};
	$scope.addCart = function(carPlate) {
		services_shop.addCart(carPlate);
	};
	$scope.rmCart = function(carPlate) {
		services_shop.rmCart(carPlate);
	};
	$scope.showModalCart = function() {
        $('#cartModal').modal('show');
	};
	$scope.showSearch = function(filpage = 1) {
		$scope.showcar = false;
		$scope.showcars = true;
		services_shop.search(filpage);
		services_shop.pagination();

	};
	angular.element(document).ready(function () {

		if (localStorage.getItem('action') == "details") {
			console.log(localStorage.getItem('action')+localStorage.getItem('value'));
			services_shop.details(localStorage.getItem('value'));
			localStorage.removeItem('action');
			localStorage.removeItem('value');
			$scope.showcar = true;
			$scope.showcars = false;
		} else if (localStorage.getItem('action') == "brand") {
			$('#shop-search').val(localStorage.getItem('value'));
			localStorage.removeItem('action');
			localStorage.removeItem('value');
			$scope.showcar = false;
			$scope.showcars = true;
			services_shop.search();
			services_shop.pagination();
		} else {
			$scope.showcar = false;
			$scope.showcars = true;
			services_shop.search();
			services_shop.pagination();
		}
		services_shop.initMap();
		$(document).on("click", ".mapsimage", function () {
			services_shop.details($(this).attr('id'));
			$scope.showcar = true;
			$scope.showcars = false;
    	});
		$(document).on("click", ".loadMoreBooks", function () {
			services_shop.load_api_books();
    	});
		services_shop.cart();
		services_shop.load_api_books();
		
	});
});