angular.module("meanTeams").controller("TeamsController", TeamsController);

function TeamsController(TeamsDataFactory) {
    const vm = this;
    vm.title = "Mean Teams App";
    TeamsDataFactory.getAll().then(function (response) {
        vm.teams = response;
    });
    vm.addTeam = function () {
        const postData = {
            country: vm.country,
            win: vm.win,
            lost: vm.lost,
            points: vm.points
            
        }
        console.log(postData)
        if (vm.teamForm.$valid) {
            TeamsDataFactory.addOne(postData).then(function (response) {
                console.log("Team saved");
            }).catch(function (error) {
                console.log("Error while saving ", error)
            })
        }
    };
    // $http.get("/api/teams").then(function (response) {
    //     vm.teams = response.data;
    // })

}