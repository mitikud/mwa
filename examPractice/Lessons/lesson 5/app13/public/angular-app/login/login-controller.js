angular.module("meanGames").controller("LoginController", LoginController);


function LoginController(UserDataFactory, AuthFactory) {
    const vm = this;
    vm.isLoggedIn = function () {
        return AuthFactory.auth;
    };

    vm.login = function () {
        if(vm.username && vm.password) {
            const user = {
                username: vm.username,
                password: vm.password
            }
        };

        UserDataFactory.login(user).then(function(result) {
            console.log("User", user);
            AuthFactory.auth = true;
        }).catch(function(error) {
            console.log("Error", error)
        })
    };

    vm.logout = function() {
        AuthFactory.auth = false;
        
    }
}