angular.module("meanGames").controller("GamesController",GamesController);
/* function GamesController($http){
	const vm = this;
	vm.title="Mean Games App";
	$http.get("/api/games").then(function(response){
		vm.games = response.data;
	});
} */
function GamesController(GamesDataFactory){
	const vm = this;
	vm.title="Mean Games App";
	GamesDataFactory.getAll().then(function(response){
		console.log(response)
		vm.games = response;
	})
		
	
}