const mongoose = require("mongoose");
const Job = mongoose.model("Job");
const systemError = 500;
const userError = 400;
const systemWorking = 200;
module.exports.jobsGetAll = function (req, res) {
	console.log("GET the jobs");
	console.log(req.query);

	let offset = 0;
	let count = 4;
	const maxCount = 8;

	if (req.query && req.query.lat && req.query.lng) {
		runGeoQuery(req, res);
		return;
	}

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset)
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count);
	}

	if (isNaN(offset) || isNaN(count)) {
		res.status(userError).json({ "message": "Querystring offset and count should be numbers" });
		return;
	}

	if (count > maxCount) {
		console.log("Error count exceeded");
		res.status(userError).json({ "message": "Connot exceede the count" });
	}

	console.log("offset ", offset, " count ", count);

	Job.find().skip(offset).limit(count).exec(function (err, jobs) {
		const response = {
			status: systemWorking,
			message: jobs
		};
		if (err) {
			console.log("Error finding jobs", err);
			response.status = systemError;
			response.message = err;
		}
		res.status(response.status).json(response.message);
	});
};

module.exports.jobsAddOne = function (req, res) {
	console.log("POST new job");
	console.log(req.body);
	if (!req.body.skills) {
		req.body.skills = []
	}
	const newJob = {
		title: req.body.title,
		salary: parseFloat(req.body.salary),
		skills: req.body.skills,
		experience: req.body.experience,
		description: req.body.description,
		location: {},
		postDate: req.body.postDate
	};

	Job.create(newJob, function (err, Job) {
		const response = {
			status: 201,
			message: Job
		};

		if (err) {
			console.log("Error Creating Job");
			response.status = systemError;
			response.message = err;
		}
		res.status(response.status).json(response.message);
	});
}

module.exports.jobsGetOne = function (req, res) {
	const jobId = req.params.jobId;
	if (jobId.length != 24) {
		res.status(userError).json({ "message": "Request Param job Id is not propper format" });
	}

	Job.findById(jobId).exec(function (err, job) {
		const response = {
			status: systemWorking,
			message: job
		};

		if (err) {
			console.log("Error finding job");
			response.status = systemError;
			response.message = err;
		} else if (!job) {
			response.status = userError;
			response.message = { "message": "job Id not found" };
		}

		res.status(response.status).json(response.message);
	});
};

module.exports.jobsFullUpdateOne = function (req, res) {
	console.log("jobsFullUpdateOne requiest recieved")
	const jobId = req.params.jobId;
	    
	Job.findById(jobId).exec(function (err, job) {
	    const response = {
		status: 204,
		message: job
	    };
    
	    if (err) {
		console.log("Error finding job");
		response.status = systemError;
		response.message = err;
	    } else if (!job) {
		response.status = userError;
		response.message = { "message": "Job Id not found" };
	    }
    
	    if (response.status !== 204) {
		res.status(response.status).json(response.message);
	    } else {
		//This is where update happens
		

		job.title = req.body.title;
		job.salary = parseFloat(req.body.salary);
		job.skills = req.body.skills;
		job.experience = req.body.experience;
		job.description = req.body.description;
		job.location = {};
		job.postDate = req.body.postDate;
    
		job.save(function (err, updatedJob) {
		    if (err) {
			response.status = systemError;
			response.message = err;
		    } else {
			response.message = updatedJob;
		    }
		    res.status(response.status).json(response.message);
		})
    
    
	    }
    
	    //res.status(response.status).json(response.message);
	});
    };

module.exports.jobsPartialUpdateOne = function (req, res) {
    console.log("jobsFullUpdateOne requiest recieved")
    const jobId = req.params.jobId;
    /* if (jobId.length != 24) {
        res.status(userError).json({ "message": "RequiestParam Job Id is not propper format" });
    } */

    Job.findById(jobId).exec(function (err, job) {
        const response = {
            status: 204,
            message: job
        };

        if (err) {
            console.log("Error finding job");
            response.status = systemError;
            response.message = err;
        } else if (!job) {
            response.status = userError;
            response.message = { "message": "Job Id not found" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            //This is where update happens
            if (req.body.title) {
                job.title = req.body.title;
            }

            if (req.body.salary) {
                job.salary = parseFloat(req.body.salary);
            }

	    if (req.body.skills) {
                job.skills = req.body.skills;
            }
	    if (req.body.experience) {
                job.experience = req.body.experience;
            }
           if (req.body.description) {
                job.description = req.body.description;
            }
		
	    if (req.body.postDate) {
                job.postDate = req.body.postDate;
            }
	   

            job.save(function (err, updatedJob) {
                if (err) {
                    response.status = systemError;
                    response.message = err;
                } else {
                    response.message = updatedJob;
                }
                res.status(response.status).json(response.message);
            })


        }

        //res.status(response.status).json(response.message);
    });
};

module.exports.jobsDeleteOne = function (req, res) {

    const jobId = req.params.jobId;
    if (jobId.length != 24) {
        res.status(userError).json({ "message": "RequiestParam Job Id is not propper format" });
    }

    Job.findByIdAndRemove(jobId).exec(function (err, deletedJob) {
        const response = {
            status: 204,
            message: deletedJob
        };

        if (err) {
            console.log("Error finding job");
            response.status = systemError;
            response.message = err;
        } else if (!deletedJob) {
            response.status = userError;
            response.message = { "message": "Job Id not found" };
        }

        res.status(response.status).json(response.message);
    });
};

