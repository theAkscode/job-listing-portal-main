const express = require('express');
const { check } = require('express-validator');

const employeeControllers = require('../controllers/employees-controller');

const router = express.Router();

router.get('/job/:jobId',employeeControllers.getEmployeeByJobId);

router.get('/:employeeId', employeeControllers.getEmployeeById);

router.patch(
    '/profile/:employeeId',
    [
        check('name').isString().notEmpty(),
        check('email').isEmail().normalizeEmail().notEmpty(),
        check('location').isString().notEmpty(),
        check('skills').isArray(),
        check('skills.*').isString(),
        check('linkedin').isString(),
        check('gitHub').isString(),
   
        check('experience').isArray(),
        check('experience.*.position').optional().isString(),
        check('experience.*.company').optional().isString(),
        check('experience.*.startDate').optional().isISO8601(),
        check('experience.*.endDate').optional().isISO8601(),
        check('experience.*.salary').optional().isNumeric(),
      
        check('education').isArray(),
        check('education.*.degree').optional().isString(),
        check('education.*.institution').optional().isString(),
        check('education.*.cgpa').optional().isNumeric(),
        check('education.*.startDate').optional().isISO8601(),
        check('education.*.endDate').optional().isISO8601(),
    ],
    employeeControllers.updateEmployee
);

module.exports = router;
