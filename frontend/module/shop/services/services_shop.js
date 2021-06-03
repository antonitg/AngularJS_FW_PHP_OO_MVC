loremipsumcars.factory('services_shop', ['$rootScope', 'services', function($scope, services) {
    let service = {search: search, details: details, pagination: pagination, cart: cart, addCart: addCart, rmCart: rmCart, addInsurance: addInsurance, rmInsurance: rmInsurance,getSearchValues:getSearchValues, initMap:initMap,load_api_books:load_api_books,addFav:addFav,rmFav:rmFav,checkout:checkout};
    return service;
	function rmInsurance(carPlate){
		if (localStorage.getItem("token") != null) {
			services.post('shop', 'rmItemIns', {registration: carPlate, token: localStorage.getItem("token")})
			.then(function(response){
				cart();				
			}, function(error) {
				console.log(error+"asdad");
			});
		} else {
			window.location.href="#/logreg";
		}
	}
	function addInsurance(carPlate){
		if (localStorage.getItem("token") != null) {
			services.post('shop', 'addItemIns', {registration: carPlate, token: localStorage.getItem("token")})
			.then(function(response){
				cart();				
			}, function(error) {
				console.log(error+"asdad");
			});
		} else {
			window.location.href="#/logreg";
		}
	}
	function rmCart(carPlate){
		if (localStorage.getItem("token") != null) {
			services.post('shop', 'rmItemCart', {registration: carPlate, token: localStorage.getItem("token")})
			.then(function(response){
				cart();				
			}, function(error) {
				console.log(error+"asdad");
			});
		} else {
			window.location.href="#/logreg";
		}
	}
	function addCart(carPlate){
		if (localStorage.getItem("token") != null) {
			services.post('shop', 'addItemCart', {registration: carPlate, token: localStorage.getItem("token")})
			.then(function(response){
				if (response != "true"){
					alertify.error("This item is temporarily out of stock save it in favorites to check it later");
					return;
				}
				cart();				
			}, function(error) {
				alertify.error("This item is temporarily out of stock save it in favorites to check it later");
				console.log(error+"asdad");
			});
		} else {
			window.location.href="#/logreg";
		}
	}
	function rmFav(carPlate){
		if (localStorage.getItem("token") != null) {
			services.post('shop', 'rmItemFav', {registration: carPlate, token: localStorage.getItem("token")})
			.then(function(response){
			}, function(error) {
				console.log(error+"asdad");
			});
		} else {
			window.location.href="#/logreg";
		}
	}
	function addFav(carPlate){
		if (localStorage.getItem("token") != null) {
			services.post('shop', 'addItemFav', {registration: carPlate, token: localStorage.getItem("token")})
			.then(function(response){
			}, function(error) {
				console.log(error+"asdad");
			});
		} else {
			window.location.href="#/logreg";
		}
	}
	function getSearchValues(filpage = 1) {
		    var filkeyword = $("#shop-search").val();
			var filbrand = $("#brand_cat").val()
			var filcondition = $("#condition_cat").val();
			var filmaxprice = $("#max_price").val();
			var filminprice = $("#min_price").val();
			var filshowing = $("#num_pag_select").val();
			if (filmaxprice == "") {
				filmaxprice = 99999999;
			}
			if (filminprice == "") {
				filminprice = 100;
			}
			return { keyword: filkeyword, brand: filbrand, condition: filcondition, minprice: filminprice, maxprice: filmaxprice, showing: filshowing, page: filpage, token: localStorage.getItem("token") };
	}
	function search(filpage = 1) {
			var url = getSearchValues(filpage);
			services.post('shop', 'getFiltersSearch', {objenv: JSON.stringify(url)})
			.then(function(response){
				if (response.length == undefined) {
                	response = [response]; 
					
					if (!response[0].registration) {
						$scope.cars=null;
						return;
					}
        	    }
				$scope.cars=response;
			}, function(error) {
				console.log(error+"asdad");
			});
	};
	function details(reg) {
			services.post('shop', 'getDetails', {registration: reg})
			.then(function(response){
				$scope.car=response;
			}, function(error) {
			});
	};
	function checkout() {
		if (localStorage.getItem("token") != null) {
			services.post('shop', 'checkout', {token: localStorage.getItem("token")})
			.then(function(response){
				alertify.success("Checkout worked perfectly!");
				cart();
				$('#cartModal').modal('hide');
			}, function(error) {
				alertify.error("Something went wrong during the checkout try again later!");
			});
		} else {
			window.location.href="#/logreg";
		}
	};
	function pagination() {
		var url = getSearchValues();
	    var showperpage = $("#num_pag_select").val();
		services.post('shop', 'getPagination', {objenv: JSON.stringify(url)})
		.then(function(response){
			if (response.length == undefined) {
                	response = [response]; 		
					if (!response[0].registration) {
						$scope.cars=null;
						return;
					}
        	    }
			if (Object.keys(response).length / showperpage - Math.floor(Object.keys(response).length / showperpage) == 0) {
                varnumfinal = Object.keys(response).length / showperpage;
            } else {
                varnumfinal = (Math.floor(Object.keys(response).length / showperpage)) + 1;
            }
			$scope.pages=new Array(varnumfinal);
		}, function(error) {
		});
	};
	function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(37.88, -1.28),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var markers = [];
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infowindow.setPosition(pos);
            map.setCenter(pos);
			services.post('shop', 'getMapShop', { lat: pos["lat"], lon: pos["lng"]})
			.then(function(response){
                    $.each(response, function (i, item) {
                        var myLatlng = new google.maps.LatLng(response[i]["lat"], response[i]["lon"]);
                        var newMarker = new google.maps.Marker({
                            position: myLatlng,
                            map,
                            title: "Car near!",
                        });
                        google.maps.event.addListener(newMarker, 'click', (function (newMarker, i) {
                            return function () {
                                infowindow.setContent("<b>" + response[i]["brand"] + " " + response[i]["model"] + "</b><br>" + response[i]["carcondition"] + " " + response[i]["price"] + "€" + "<br><img ng-click='showDetails("+response[i]["registration"]+")' class='mapsimage' id='" + response[i]["registration"] + "' style='height:110px;' src='" + response[i]["src"] + "' alt='image in infowindow'>");
                                infowindow.open(map, newMarker);
                            }
                        })(newMarker, i));
                        markers.push(newMarker);
                    });
			}, function(error) {
				console.log(error+"asdad");
			});
        },
        () => {
            console.log(true, infoWindow, map.getCenter());
        }
    );
};
	function cart() {
		services.post('shop', 'getCart', {token: localStorage.getItem("token")})
		.then(function(response){
            if (response.length == undefined) {
                response = [response]; 
                if (!response[0].registration) {
					$scope.cart=null;
					return;
                }
            }
			$scope.cartPrice=0;
			response.forEach(function(d) {
			  if (d.hasOwnProperty('cartprice')) {
				$scope.cartPrice += parseInt(d.cartprice);
			  }
			});
			$scope.cart=response;

		}, function(error) {
			console.log(error+"asdad");
		});
	};
	function load_api_books() {
		var offset = $("#books_releated")[0].childElementCount;
		var limit = 3;
		$.ajax({
			type: 'GET',
			dataType: 'JSON',
			url: 'https://www.googleapis.com/books/v1/volumes?q=car&maxResults=40&orderBy=newest',
		}).done(function (jsonCar) {
			for (i = offset; i < offset + limit; i++) {
				try {
					var foto = jsonCar.items[i].volumeInfo.imageLinks.thumbnail;
				}
				catch (err) {
					var foto = "http://books.google.com/books/content?id=cr4IyD5l1NQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
				}
				var title = jsonCar.items[i].volumeInfo.title;
				var desc = jsonCar.items[i].volumeInfo.description;
				var link = jsonCar.items[i].volumeInfo.previewLink;
				var pags = jsonCar.items[i].volumeInfo.pageCount;
				$('<div></div>').attr({ 'class': 'Card1', 'id': 'book' + i }).appendTo("#books_releated");
				$('<div></div>').attr({ 'class': 'photo', 'style': 'background-image:url("' + foto + '");' }).appendTo("#book" + i);
				$('<ul></ul>').attr({ 'class': 'details', 'id': 'ulbook' + i }).appendTo("#book" + i);
				$('<h4></h4>').append(document.createTextNode(title)).appendTo('#ulbook' + i);
				$('<div></div>').attr({ 'class': 'description', 'id': 'description' + i }).appendTo('#book' + i);
				$('<div></div>').attr({ 'class': 'line', 'id': 'line' + i }).appendTo('#description' + i);
				$('<h1></h1>').attr({ 'class': 'product_name' }).append(document.createTextNode(title)).appendTo('#line' + i);
				$('<h1></h1>').attr({ 'class': 'product_price' }).append(document.createTextNode(pags + " Pags")).appendTo('#line' + i);
				$('<p></p>').attr({ 'class': 'summary' }).append(document.createTextNode(desc)).appendTo('#description' + i);
				$('<a></a>').attr({ 'href': link }).append(document.createTextNode("Read More")).appendTo('#description' + i);
			}
			$('<button></button>').attr({'type':'button','class':'btn btn-warning loadMoreBooks'}).append(document.createTextNode("Load More")).appendTo("#books_releated");
		}).fail(function (jqXHR, textStatus, errorThrown) {
			if (console && console.log) {
				console.log("Error name/code: " + textStatus);
			}
		});
	}
}]);//