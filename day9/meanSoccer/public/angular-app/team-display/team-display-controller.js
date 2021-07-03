angular.module("meanTeams").controller("TeamController", TeamController);

function _getStarsArray(rating) {
    return new Array(rating);
}

function TeamController(TeamsDataFactory, $routeParams) {
    const vm = this;
    const teamId = $routeParams.id;
    TeamsDataFactory.getOne(teamId).then(function (response) {
        console.log(response)
        vm.team = response;
        vm.stars = _getStarsArray(vm.team.rate)
    });
    vm.deleteTeam = function () {
        const teamId = $routeParams.id;
        
        TeamsDataFactory.delete(teamId).then(function (response) {
            console.log("Team removed");
        }).catch(function (error) {
            console.log("Error while deleting ", error)
        })

    };

    vm.deletePlayer = function(playerId){
        const teamId = $routeParams.id;

        TeamsDataFactory.deletePlayer(teamId,playerId).then(function (response) {
                console.log("successfully deleted");
            }).catch(function (error) {
                console.log("Error while deleting ", error)
            })
    }

     vm.addPlayer = function () {
         const teamId = $routeParams.id;
        const postData = {
            name: vm.name,
            age: vm.age,
            position: vm.position
            
        }
        
        if (vm.teamForm.$valid) {
            TeamsDataFactory.addPlayer(postData,teamId).then(function (response) {
                console.log("Team saved");
            }).catch(function (error) {
                console.log("Error while saving ", error)
            })
        }
    };

}