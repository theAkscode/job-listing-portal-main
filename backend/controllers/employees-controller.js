const {validationResult}=require('express-validator');
const mongoose=require('mongoose');

const HttpError=require('../models/http-error');
const Employee=require('../models/Employee');
const User=require('../models/User');

const getEmployeeByJobId = async (req,res,next)=>{
    let employee;
    const jId=req.params.jobId;
    try{
        employee=await Employee.find({applications:jId});
    } catch(err){
        const error = new HttpError('Fetching employees failed',500);
        return next(error);
    }
    res.json(employee);
}

const getEmployeeById = async (req,res,next)=>{
    let employee;
    const eId=req.params.employeeId;
    try{
        employee=await Employee.findById(eId);
    } catch(err){
        const error = new HttpError('Fetching employees failed',500);
        console.log(err);
        return next(error);
    }
    res.json(employee);
}

const updateEmployee = async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, location, skills, linkedin, gitHub, experience, education } = req.body;
    const eId = req.params.employeeId;

    let employee;
    try{
        employee=await Employee.findById(eId);
        const user=await User.findById(employee.userId);

        employee.name= name || user.name;
        employee.email=email || user.email;
        employee.location=location || employee.location;
        employee.skills=skills || employee.skills;
        employee.linkedin=linkedin || employee.linkedin;
        employee.gitHub=gitHub || employee.gitHub;
        employee.experience=experience || employee.experience;
        employee.education=education || employee.education;

        user.name=name || user.name;

        await employee.save()
        await user.save()

    } catch(err){
        const error=new HttpError('updating details failed',500);
        return next(error);
    }

    res.status(200).json({ employee: employee.toObject({ getters: true }) });
}

exports.getEmployeeById=getEmployeeById;
exports.updateEmployee=updateEmployee;
exports.getEmployeeByJobId=getEmployeeByJobId;