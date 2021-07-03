angular.module("myPropperApp", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "mainPage/main.html", 
        controller: "MainController",
        controllerAs: "mainCtrl"
    }).when("/about", {
        templateUrl: "aboutPage/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    }).when("joke/:jokeType", {
        templateUrl: "joke/joke.html",
        controller: "JokeController",
        controllerAs: "jokeCtrl"
    })
    .otherwise({
        redirectTo:"/"
    });
}