angular.module("meanGames").controller("RegisterController", RegisterController);

function RegisterController(UsersDataFactory) {
    const vm = this;
    vm.register = function () {
        if(!vm.username || !vm.password || !vm.password-repeat || !vm.name) {
            vm.err = "Please make sure you fill all the fields"
        } else {
            if(vm.password !== vm.password-repeat) {
                vm.err = "Please make sure the passwords match"
            } else {
                const newUser = {
                    username: vm.username,
                    password: vm.password,
                    name: vm.name
                }
                UsersDataFactory.register(newUser).then(function(result) {
                    console.log("register done");
                    vm.message = "successfull registration, please login";
                    vm.err = "";
                }).catch(function(error) {
                    console.log("error", error);
                    vm.err = error;
                })
            }
        }
        
    }
}