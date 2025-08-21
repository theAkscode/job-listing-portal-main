const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

const HttpError=require('../models/http-error');
const User=require('../models/User');
const Employee=require('../models/Employee');
const Employer=require('../models/Employer');


const signup = async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid input',400));
    }

    const {name,userType,email,password}=req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email:email})
    } catch(err){
        const error=new HttpError('Invalid input',422);
        return next(error);
    }
    if(existingUser){
        const error=new HttpError('Email already in use',422);
        return next(error);
    }

    const createdUser=new User({
        name,
        userType,
        email,
        password
    });

    try{
        await createdUser.save();
    } catch(err){
        const error=new HttpError('Failed to Sign up',500);
        return next(error);
    }

    if(userType==='Employee'){
        const createdEmployee=new Employee({
            name,
            email,
            userId:createdUser._id,
            linkedin:'',
            gitHub:'',
            education: [{
                degree: '',
                institution: '',
                cgpa: 0,
                startDate: '',
                endDate: ''
            }],
            skills:[''],
            experience:[{
                position: '',
                company: '',
                startDate: '',
                endDate: '',
                salary: 0
            }],
        });
    
        try{
            await createdEmployee.save();
        } catch(err){
            const error=new HttpError('Failed to Sign up emp',500);
            console.log(err)
            return next(error);
        }
    } else{
        const createdEmployer=new Employer({
            name,
            email,
            userId:createdUser._id,
        })
        try{
            await createdEmployer.save();
        } catch(err){
            const error=new HttpError('Failed to Sign up',500);
            return next(error);
        }
    }

    res.status(201).json({user:createdUser.toObject({getters:true})});

}

const login= async (req,res,next)=>{
    const {email,password } = req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email:email})
    } catch(err){
        const error=new HttpError('Logging in  failed, try again later',500);
        return next(error);
    }

    if(!existingUser || existingUser.password!==password){
        const error=new HttpError('Invalid credentials, try again',401);
        return next(error)
    }

    let uid;

    if (existingUser.userType === 'Employee') {
        const employee = await Employee.findOne({ userId: existingUser.id });
        uid = employee ? employee.id : null;
    } else if (existingUser.userType === 'Employer') {
        const employer = await Employer.findOne({ userId: existingUser.id });
        uid = employer ? employer.id : null;
    }

    let token;
    try{
        token= jwt.sign(
            {
                userId:existingUser.id,
                email:existingUser.email,
                userType:existingUser.userType,
                userTypeId:uid,
            },
            'JLABV6TWR17TR3R',
            {expiresIn:'6h'},
        );
    } catch(err){
        const error=new HttpError('Failed to login',500);
        return next(error);
    }

    res.json({
        userId:existingUser.id,
        email:existingUser.email,
        userType:existingUser.userType,
        userTypeId:uid,
        token:token
    });
};

exports.signup=signup;
exports.login=login;