const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const ExperienceSchema = new Schema({
    position: { type: String },
    company: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    salary: { type: Number }
}, { _id: false });

const EducationSchema = new Schema({
    degree: { type: String },
    institution: { type: String },
    cgpa: { type: Number },
    startDate: { type: String },
    endDate: { type: String }
}, { _id: false });

const EmployeeSchema = new Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String },
    experience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [{ type: String }], 
    linkedin: { type: String },
    gitHub: { type: String},
    applications: [{ type: Schema.Types.ObjectId, ref: 'Job' }]
});


module.exports=mongoose.model('Employee',EmployeeSchema);