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

	vm.addGame= function(){
		const postData = {
			title: vm.newGameTitle,
			price: vm.newGamePrice,
			year: vm.newGameYear,
			minPlayers: vm.newGameMinPlayers,
			maxPlayers: vm.newGameMaxPlayers,
			minAge: vm.newGameMinAge,
			rate: vm.newGameRating,
			designers: vm.newGameDesigner,
			//publisher: {}
		}
		if(vm.gameForm.$valid){
			//call REST API
			//call from game data factory
			GamesDataFactory.addOne(postData).then(function(response){
				console.log("Game Saved");
			}).catch(function(err){
				console.log("Error while saving ",  err);
			}
			)};
		}
	
		
	
}