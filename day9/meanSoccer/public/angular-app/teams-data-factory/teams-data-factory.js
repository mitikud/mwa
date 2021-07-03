angular.module("meanTeams").factory("TeamsDataFactory", TeamsDataFactory);
function TeamsDataFactory($http) {
    return {
        getAll: getAllTeams,
        getOne: getOneTeam,
        addOne: addOneTeam,
        delete: deleteTeam,
        addPlayer: addPlayer,
        deletePlayer: deletePlayer

    };
    function addOneTeam(team) {
        return $http.post("/api/teams", team).then(complete).catch(failed);

    }
     function addPlayer(player,id) {
        return $http.post("/api/teams/"+id+"/players", player).then(complete).catch(failed);

    }
     function deletePlayer(id,playerId) {
        return $http.delete("/api/teams/"+id+"/players/"+playerId).then(complete).catch(failed);

    }
    function getAllTeams() {
        return $http.get("/api/teams").then(complete).catch(failed);
    }
    function getOneTeam(id) {
        return $http.get("/api/teams/" + id).then(complete).catch(failed);
    }
    function deleteTeam(id) {
        return $http.delete("/api/teams/"+id).then(complete).catch(failed);
    }
    function complete(response) {
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
    
}