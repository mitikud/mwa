angular.module("meanGames").controller("LoginController", LoginController);


function LoginController(UsersDataFactory, AuthFactory, $window, jwtHelper, $location) {
    const vm = this;

    vm.loggedinUser = 
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

        UsersDataFactory.login(user).then(function(result) {
            console.log("User", user);
            $window.sessionStorage.token = result.token;
            AuthFactory.auth = true;
            const token =  $window.sessionStorage.token
            const decodedToken = jwtHelper.decodeTOken(token);
            vm.loggedinUser = decodedToken.name;
            vm.username = "";
            vm.password = "";
        }).catch(function(error) {
            console.log("Error", error)
        })
    };

    vm.logout = function() {
        AuthFactory.auth = false;
        delete $winsow.sessionStorage.token;
        $location.path("/");  
    };

    vm.isActiveTab = function(url) {
        const currentPath = $location.path().split("/")[1];
        return(url === currentPath ? "active" : "");
    }
}