const express=require('express');
const {check}=require('express-validator');

const jobControllers=require('../controllers/jobs-controller');

const router=express.Router();

router.get('/',jobControllers.getJobs);
router.get('/:jobId',jobControllers.getjobById);
router.get('/:employeeId/applied',jobControllers.getAppliedJobs);
router.post('/:jobId/apply',jobControllers.applyJob);
router.get('/:employerId/posted',jobControllers.getPostedJobs);

router.post('/:employerId/new',
    [
        check('title').notEmpty().isString(),
        check('company').notEmpty().isString(),
        check('type').notEmpty().isString(),
        check('experience').notEmpty().isString(),
        check('education').notEmpty().isString(),
        check('description').notEmpty().isString(),
        check('location').notEmpty().isString(),
        check('salary').notEmpty().isString(),
        check('skills').notEmpty().isArray(),
        check('skills.*').isString(),
        check('roles').notEmpty().isArray(),
        check('roles.*').isString(),
    ],
    jobControllers.newJob);

module.exports=router;

