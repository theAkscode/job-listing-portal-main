const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  created: { type: Schema.Types.ObjectId, ref: 'Employer', required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, required: true },
  experience: { type: String, required: true }, 
  education: { type: String, required: true }, 
  salary: { type: String, required: true }, 
  location: [{ type: String, required: true }], 
  posted: { type: Date, required: true }, 
  description: { type: String, required: true },
  skills: [{ type: String, required: true }], 
  roles: [{ type: String, required: true }],
  applicants: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]
});


module.exports = mongoose.model('Job', JobSchema);
