angular.module("meanJobs").factory("JobsDataFactory", JobsDataFactory);
function JobsDataFactory($http) {
    return {
        getAll: getAllJobs,
        getOne: getOneJob,
	    addOne:addOneJob,
	    delete: deleteJob,
        update:updateJob
	//update: updateJob
       
    };
   
    function getAllJobs() {
        return $http.get("/api/jobs").then(complete).catch(failed);
    }
    function getOneJob(id) {
        return $http.get("/api/jobs/" + id).then(complete).catch(failed);
    }
    function deleteJob(id) {
        return $http.delete("/api/jobs/" + id).then(complete).catch(failed);
    }
   function addOneJob(job) {
        return $http.post("/api/jobs", job).then(complete).catch(failed);

    } 

    function updateJob(job,id) {
        return $http.patch("/api/jobs/" + id, job).then(complete).catch(failed);

    } 

    function complete(response) {
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
    
}