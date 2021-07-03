angular.module("meanJobs").controller("JobsController",JobsController);
/* function JobsController($http){
	const vm = this;
	vm.title = "Mean Jobs App";
	$http.get("/api/jobs").then(function(response){
		vm.jobs=response.data;
	});
} */
function JobsController(JobsDataFactory){
	const vm = this;
	vm.title = "Mean Jobs App";
	JobsDataFactory.getAll().then(function(response){
		vm.jobs=response;
	});
}
