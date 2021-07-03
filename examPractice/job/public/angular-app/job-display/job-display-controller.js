angular.module("meanJobs").controller("JobController", JobController);
function JobController(JobsDataFactory, $routeParams, $location){
	const vm = this;
	const jobId = $routeParams.id;
	JobsDataFactory.getOne(jobId).then(function(response){
		vm.job=response;
	});
	vm.deleteJob = function () {
        //const jobId = $routeParams.id;
        
        JobsDataFactory.delete(jobId).then(function (response) {
            console.log("job removed");
        }).catch(function (error) {
            console.log("Error while deleting ", error)
        })

    };

    vm.backHome = function(){
        $location.path("/");
    }


}