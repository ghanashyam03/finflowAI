const db = require('../config/firebase.js');

const createSubscription = async (req, res) => {
    try {
        const { subscriptionName, duration, amount, alert } = req.body;

        // Check if required fields are present
        if (!subscriptionName || !duration || !amount || alert === undefined) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Create a new subscription document
        const response = await db.collection('subscription').add({
            subscriptionName,
            duration,
            amount,
            alert,
        });

        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllSubscriptions = async (req, res) => {
    try {
        const response = await db.collection('subscription').get();
        let responseArr = [];
        response.forEach((doc) => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSubscriptionById = async (req, res) => {
    try {
        const subscriptionId = req.params.id;
        const response = await db.collection('subscription').doc(subscriptionId).get();
        res.send(response.data());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSubscription = async (req, res) => {
    try {
        const subscriptionId = req.body.id;
        const newData = req.body.newData;

        // Check if id is valid
        if (!subscriptionId || typeof subscriptionId !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing id parameter' });
        }

        // Check if the subscription document exists
        const subscriptionDoc = await db.collection('subscription').doc(subscriptionId).get();
        if (!subscriptionDoc.exists) {
            return res.status(404).json({ error: 'Subscription document not found' });
        }

        // Update the subscription document
        const subscriptionRef = await db.collection('subscription').doc(subscriptionId).update(newData);

        res.json({ success: true, subscriptionRef });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
};
