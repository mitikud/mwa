angular.module("meanSoccer").controller("TeamsController", TeamsController);
	
function TeamsController($http){
	const vm = this;
	vm.title = "Meam Games App";
	$http.get("/api/teams").then(function(response){
		vm.teams = response.data;
	})
}
	
