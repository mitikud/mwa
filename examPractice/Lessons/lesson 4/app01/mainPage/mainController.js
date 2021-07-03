angular.module("myPropperApp").controller("MainController", MainController);

function MainController(JokeFactory) {
    const vm = this;

    JokeFactory.getTenJokes()
        .then(function (response) {
            console.log(response);
            vm.jokes = response;
        });
}