const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployerSchema = new Schema({
  name:{ type: String, required: true },
  email: { type: String, required: true,unique:true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  posted: [{ type: Schema.Types.ObjectId, ref: 'Job', required: true }]
});


module.exports = mongoose.model('Employer', EmployerSchema);
