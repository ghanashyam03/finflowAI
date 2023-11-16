const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController.js');

// Create a new subscription
router.post('/create', subscriptionController.createSubscription);

// Get all subscriptions
router.get('/all', subscriptionController.getAllSubscriptions);

// Get a subscription by ID
router.get('/:id', subscriptionController.getSubscriptionById);

// Update a subscription
router.put('/subscriptions', subscriptionController.updateSubscription);

module.exports = router;
