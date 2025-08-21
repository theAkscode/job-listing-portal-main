const mongoose = require('mongoose');
const {validationResult}=require('express-validator');

const HttpError=require('../models/http-error');
const Employee=require('../models/Employee');
const Employer=require('../models/Employer');
const Job=require('../models/Job');

const getJobs = async (req,res,next)=>{
    let jobs;
    try{
        jobs= await Job.find()
    } catch(err){
        const error=new HttpError('Could not fetch jobs, try again',500);
        return next(error);
    }

    res.json(jobs)
}

const getjobById = async(req,res,next)=>{
    let job;
    try{
        job=await Job.findById(req.params.jobId)
    } catch(err){
        const error=new HttpError('Could not find job',404);
        return next(error);
    }
    res.json(job);
}

const getPostedJobs = async (req,res,next)=>{
    const emrId=req.params.employerId;

    let postedJobs;
    try{
        postedJobs= await Job.find({created:emrId});
    } catch(err){
        const error=new HttpError('Could not fetch jobs, try again',500);
        return next(error)
    }

    res.json(postedJobs);
}

const getAppliedJobs = async(req,res,next)=>{
    const empId=req.params.employeeId;

    let appliedJobs;
    try{
        appliedJobs= await Job.find({applicants:empId});
    } catch(err){
        const error=new HttpError('Could not fetch jobs, try again',500);
        return next(error);
    }
    if(appliedJobs.length===0){
        const error=new HttpError('No jobs found',404);
        return next(error);
    }

    res.json(appliedJobs);
}

const applyJob = async(req,res,next)=>{
    const {jobId} = req.params;
    const {employeeId} = req.body;
    
    let job,emp;

    try{
        job= await Job.findById(jobId);
    } catch(err){
        const error=new HttpError('Could not find job',404);
        return next(error);
    }

    try{
        emp= await Employee.findById(employeeId);
    } catch(err){
        const error=new HttpError('Could not find employee',404);
        return next(error);
    }

    if(job.applicants.includes(employeeId) || emp.applications.includes(jobId)){
        const error=new HttpError('You have already applied for this job',400);
        return next(error);
    }

    try{
        const sess=await mongoose.startSession();

        sess.startTransaction();

        emp.applications.push(jobId);
        await emp.save({session:sess})

        job.applicants.push(employeeId);
        await job.save({session:sess});

        await sess.commitTransaction();
    } catch(err){
        const error=new HttpError('Could not apply for the job, try again',500)
        console.log(err);
        return next(error);
    }
    res.status(200).json(true);
}

const newJob = async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed',422);
    }

    const {title,company,type,experience,education,salary,location,description,skills,roles} = req.body;
    const created=req.params.employerId; 

    const job = new Job({
        created,
        title,
        company,
        type,
        experience,
        education,
        salary,
        location,
        description,
        skills,
        roles,
        posted: new Date()
    })
    
    let emr;
    try{
        emr=await Employer.findById(created);
    } catch(err){
        const error=new HttpError('Could not find employer',404);
        return next(error);
    }

    try{
        const sess=await mongoose.startSession()
        sess.startTransaction();

        await job.save({session:sess});
        emr.posted.push(job);
        await emr.save({session:sess});

        await sess.commitTransaction();
    } catch(err){
        const error=new HttpError('could not post a new job',500);
        console.log(err);
        return next(error);
    }

    res.status(200).json({job});
}

exports.getJobs=getJobs;
exports.getjobById=getjobById;
exports.newJob=newJob;
exports.getPostedJobs=getPostedJobs;
exports.getAppliedJobs=getAppliedJobs;
exports.applyJob=applyJob;