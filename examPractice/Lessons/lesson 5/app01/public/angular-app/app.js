angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        tempplateUrl:"angular-app/game-list/game-list.html",
        controller:"GamesController",
        controllerAs:"vm"
    })
}