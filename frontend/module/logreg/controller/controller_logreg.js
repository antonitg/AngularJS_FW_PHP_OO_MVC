loremipsumcars.controller('controller_logreg', function($scope, services, services_logreg, verifyAcc) {
	$scope.login = function(carPlate) {
		services_logreg.login();
		$scope.showcar = true;
		$scope.showcars = false;

	};
	$scope.showLogin = function() {
		$scope.divlogin = true;	
	};
	$scope.showReg = function() {
		$scope.divlogin = false;	
	};
	$scope.login = false;
	$scope.register = function() {
		services_logreg.register();
		console.log("reg");
	};
	$scope.login = function() {
		services_logreg.login();
		console.log("log");
	};
	$scope.recover = function() {
		services_logreg.recover();
	};
	var firebaseConfig = {
	  apiKey: "AIzaSyB5_UAGQqEd6t0rKFvROtTvEh3ZllSrhzw",
	  authDomain: "app-concessionaire-map.firebaseapp.com",
	  projectId: "app-concessionaire-map",
	  storageBucket: "app-concessionaire-map.appspot.com",
	  messagingSenderId: "186165963650",
	  appId: "1:186165963650:web:870712f1cf6611515abd9b",
	  measurementId: "G-FNQQZ845DE"
	};
	$scope.fbg = function fbg() {
	  firebase.initializeApp(firebaseConfig);
	  var provider = new firebase.auth.GoogleAuthProvider();
	  console.log("Firebase Google Login");
	  firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
		  console.log(result);
		  if (result.code == "auth/account-exists-with-different-credential") {
		  	alertify.warning(result.message);
		  }
		  services_logreg.social(result.user.uid,result.user.displayName,result.user.email,result.user.photoURL);
		}).catch((error) => {
		  if (error.code == "auth/account-exists-with-different-credential") {
		  	alertify.warning(error.message);
		  }
		});
	};
	$scope.fbgh = function fbgh() {
	  firebase.initializeApp(firebaseConfig);
	  var provider = new firebase.auth.GithubAuthProvider();
	  console.log("Firebase Ghub Login");
	  firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
		  if (result.code == "auth/account-exists-with-different-credential") {
		  	alertify.warning(result.message);
		  }
		  services_logreg.social(result.user.uid,result.user.displayName,result.user.email,result.user.photoURL);
		}).catch((error) => {
		  if (error.code == "auth/account-exists-with-different-credential") {
		  	alertify.warning(error.message);
		  }
		});
	};
	$(document).on("keyup blur focus", "input, textarea", function (e) {
		  var $this = $(this),
			label = $this.prev("label");

		  if (e.type === "keyup") {
			if ($this.val() === "") {
			  label.removeClass("active highlight");
			} else {
			  label.addClass("active highlight");
			}
		  } else if (e.type === "blur") {
			if ($this.val() === "") {
			  label.removeClass("active highlight");
			} else {
			  label.removeClass("highlight");
			}
		  } else if (e.type === "focus") {
			if ($this.val() === "") {
			  label.removeClass("highlight");
			} else if ($this.val() !== "") {
			  label.addClass("highlight");
			}
		  }
		});
	});// end_controller
