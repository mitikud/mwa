angular.module("meanSoccer",['ngRoute']).config(config);

function config($routeProvider){
	$routeProvider.when("/",{
		templateUrl:"angular-app/team-list/team-list.html",
		controller:"TeamsController",
		controllerAs:"vm"
	});
}