const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController.js');

router.post('/create', salaryController.createSalary);
router.post('/update', salaryController.updateSalary);

module.exports = router;
