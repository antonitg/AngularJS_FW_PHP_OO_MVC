loremipsumcars.factory('services_logreg', ['$rootScope', 'services', function($scope, services) {
    let service = {login: login, register: register, recover: recover, recoverPasswd:recoverPasswd,social:social};
    return service;
	function register() {
			services.post('logreg', 'register',  {fullname: $("#regfullname").val(), username: $("#regusername").val(), email: $("#regemail").val(), passwd: $("#regpasswd").val()})
			.then(function(response){
				services.post('logreg', 'sendVerifyEmail',{email:$("#regemail").val()})
				.then(function(response){
					console.log(response);

				}, function(error) {
				});
				
			}, function(error) {
			});
	};
	function recoverPasswd() {
		services.post('logreg', 'setPasswdRecovered',{token: document.location.href.split('/')[7], passwd: $("#recpasswd").val() })
			.then(function(response){
				alertify.success("Password updated!");
				window.location.href = '#/logreg';
			}, function(error) {
				console.log(error+"asdad");
			});
	}
	function recover() {
		services.post('logreg', 'sendRecoverEmail', {email: $("#veremail").val()})
			.then(function(response){
				alertify.success("Email sent, check your inbox!");
			}, function(error) {
				console.log(error+"asdad");
			});
	}
	function login() {
			services.post('logreg', 'login', {username: $("#logusername").val(), passwd: $("#logpasswd").val()})
			.then(function(response){
					if (response[2] === undefined) {
					  if (response[1] == "warning") {
						alertify.warning(response[0]);
					  } else {
						alertify.warning(response[0]);
					  }
					} else {
					  alertify.success(response[0]);
					  localStorage.setItem("token", response[1]);											
					  window.location.href = response[2];
					  window.location.reload(true);  
					}
			}, function(error) {
				console.log(error+"asdad");
			});
	};
	function social(scuid,scdisplayName,scemail,scphotoURL) {
			services.post('logreg', 'social', {uid:scuid,username: scdisplayName, email:scemail,photo: scphotoURL})
			.then(function(response){
				alertify.success(response[0]);
				localStorage.setItem("token", response[1]);
				window.location.href = response[2];
                window.location.reload(true);
			}, function(error) {
				console.log(error);
			});
	};
}]);//