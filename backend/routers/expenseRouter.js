const express = require('express');
const expenseController = require('../controllers/expenseController.js');

const router = express.Router();

// Create a new expense
router.post('/create', expenseController.createExpense);

// Update an existing expense
router.put('/update', expenseController.updateExpense);

// Get all expenses
router.get('/all', expenseController.getAllExpenses);

// Get an expense by ID
router.get('/:id', expenseController.getExpenseById);

module.exports = router;
