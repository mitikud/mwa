angular.module("meanJobs").controller("JobController", JobController);
function JobController(JobsDataFactory, $routeParams, $location) {
    const vm = this;
    const jobId = $routeParams.id;
    vm.skill = null;
    JobsDataFactory.getOne(jobId).then(function (response) {
        vm.job = response;
    });
    vm.deleteJob = function () {
        //const jobId = $routeParams.id;

        JobsDataFactory.delete(jobId).then(function (response) {
            console.log("job removed");
        }).catch(function (error) {
            console.log("Error while deleting ", error)
        })

    };

    vm.addSkill = function () {
        console.log('test')
        if(vm.job.skills){
            vm.job.skills.push(vm.skill)
        } else {
            vm.job.skills = [];
            vm.job.skills.push(vm.skill)
        }
        
        vm.updateJob();
    }
    vm.updateJob = function () {
        if (vm.jobForm.$valid) {
            //Call REST API
            JobsDataFactory.update(vm.job, jobId).then(function (response) {
                console.log("jobSaved saved");
            }).catch(function (error) {
                console.log("Error while saving ", error);
            });

        }
    }

    vm.backHome = function () {
        $location.path("/");
    }


}