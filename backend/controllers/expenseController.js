const db = require('../config/firebase.js');
const { total: fetchTotal, purpose: fetchPurpose } = require('../script/fetch.js');

const createExpense = async (req, res) => {
    try {
        console.log(fetchTotal, fetchPurpose); // Use the variables fetched from the external script
        const { total, purpose } = req.body;
        const response = await db.collection('expenses').add({ total, purpose });
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { id, newTotal, newPurpose } = req.body;

        // Check if id is valid
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing id parameter' });
        }

        // Check if the expense document exists
        const expenseDoc = await db.collection('expenses').doc(id).get();
        if (!expenseDoc.exists) {
            return res.status(404).json({ error: 'Expense document not found' });
        }

        // Update the expense document
        const expenseRef = await db.collection('expenses').doc(id).update({
            total: newTotal,
            purpose: newPurpose,
        });

        res.json({ success: true, expenseRef });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllExpenses = async (req, res) => {
    try {
        const snapshot = await db.collection('expenses').get();
        const expenses = [];
        snapshot.forEach((doc) => {
            expenses.push({ id: doc.id, ...doc.data() });
        });
        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is valid
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing id parameter' });
        }

        const expenseDoc = await db.collection('expenses').doc(id).get();
        if (!expenseDoc.exists) {
            return res.status(404).json({ error: 'Expense document not found' });
        }

        const expenseData = { id: expenseDoc.id, ...expenseDoc.data() };
        res.json(expenseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { 
    createExpense, 
    updateExpense, 
    getAllExpenses, 
    getExpenseById, 
};
