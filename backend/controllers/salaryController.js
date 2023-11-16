const db = require('../config/firebase.js');

const createSalary = async (req, res) => {
    try {
        const { amount } = req.body;
        const response = await db.collection('salary').add({ amount });
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSalary = async (req, res) => {
    try {
        const { id, newAmount } = req.body;

        // Check if id is valid
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing id parameter' });
        }

        // Check if the salary document exists
        const salaryDoc = await db.collection('salary').doc(id).get();
        if (!salaryDoc.exists) {
            return res.status(404).json({ error: 'Salary document not found' });
        }

        // Update the salary document
        const salaryRef = await db.collection('salary').doc(id).update({
            amount: newAmount,
        });

        res.json({ success: true, salaryRef });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createSalary,
    updateSalary,
};
