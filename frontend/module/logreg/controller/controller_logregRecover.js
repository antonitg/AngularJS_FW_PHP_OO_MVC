loremipsumcars.controller('controller_logregRecover', function($scope, services, services_logreg) {
	$scope.recoverpasswd = function() {
		services_logreg.recoverPasswd();
	};
	});// end_controller
