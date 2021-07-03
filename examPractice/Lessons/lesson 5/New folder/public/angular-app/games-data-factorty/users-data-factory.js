angular.module("meanGames").factory("UsersDataFactory", UsersDataFactory);

function UsersDataFactory($http) {
    return {
        getOne: getOneUser,
        register: addOneUser
    }

    
    function getOneUser(user) {
        return $http.post("/api/users/login/" + user)
            .then(complete)
            .catch(failed)
    }

    function addOneUser(user) {
        return $http.post("/api/games/", user)
            .then(complete)
            .catch(failed)
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}