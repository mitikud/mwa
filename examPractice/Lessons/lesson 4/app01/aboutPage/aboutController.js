angular.module("myPropperApp").controller("AboutController", MyProperController);

function MyProperController() {
    const vm = this;
    vm.bio = "This is my Bio";
}