angular.module("myPropperApp").controller("JokeController", JokeController);

function JokeController($routeParams, JokeFactory) { 
    const vm = this;
    const jokeType = $routeParams.jokeType;

    JokeFactory.getOneJoke(jokeType)
        .then(function (response) {
            vm.jokes = response[0];
        });
}