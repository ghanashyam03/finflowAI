const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController.js');

router.post('/create', loanController.createLoan);
router.put('/update', loanController.updateLoan);
router.get('/all', loanController.getAllLoans);
router.get('/:id', loanController.getLoanById);

module.exports = router;
