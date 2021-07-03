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

	vm.addJob = function(){
		console.log("test")
	const newJob = {
		title : vm.newJobTitle,
		salary : vm.newJobSalary,
		skills : vm.newJobSkills,
		experience : vm.newJobExperience,
		description : vm.newJobDescription,
		address : vm.newJobAddress,
		city : vm.newJobCity,
		postCode : vm.newJobPostCode,		
		postDate : vm.newJobPostDate
	};
	if(vm.jobForm.$valid){
		//Call REST API
		JobsDataFactory.addOne(newJob).then(function(response){
			console.log("jobSaved saved");
		}).catch(function(error){
			console.log("Error while saving ", error);
		});

	}
}



}
