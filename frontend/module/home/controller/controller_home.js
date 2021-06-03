loremipsumcars.controller('controller_home', function($scope, homeLoadSliderProd, homeLoadCat) {
	$scope.Cats = homeLoadCat;
	$scope.Slider = homeLoadSliderProd;
	$scope.title = "Home page";
	$scope.desc = "Lorem ipsum dolor sit amet consectetur adipiscing elit nisl quis semper, rutrum consequat donec praesent curabitur himenaeos dapibus in ac, euismod conubia cras habitant mi magna habitasse urna est. Curabitur sociis accumsan ullamcorper in mus eros aenean dapibus conubia, blandit quam primis rhoncus rutrum eget nisi cras magnis, habitasse condimentum nisl volutpat himenaeos nascetur sem magna. Sagittis torquent himenaeos quisque tortor fringilla morbi nisl nec, conubia dignissim vivamus parturient praesent dapibus.";
	$scope.cattitle = "Explore our categories";
	$scope.redirectShop = function(carPlate) {
		localStorage.setItem('action', 'details');
		localStorage.setItem('value', carPlate);
		window.location.href = "#shop";
	};
	angular.element(document).ready(function () {

var owl = $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                }
            });
		owl.trigger('refresh.owl.carousel');
		$("#owlcarousel").owlCarousel({
			navigation: true,
			pagination: true,
			slideSpeed: 1000,
			stopOnHover: true,
			autoPlay: true,
			items: 5,
			itemsDesktopSmall: [1024, 3],
			itemsTablet: [600, 1],
			itemsMobile: [479, 1]
		});                
    });
});// end_controller
