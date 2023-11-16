const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Define routes for user operations
router.post('/create', userController.createUser);
router.get('/read/all', userController.getAllUsers);
router.get('/read/:id', userController.getUserById);
router.post('/update', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
