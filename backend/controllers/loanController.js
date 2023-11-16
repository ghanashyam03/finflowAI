const db = require('../config/firebase.js');

const createLoan = async (req, res) => {
    try {
        const { loanName, startDate, endDate, interest, overdue } = req.body;

        // Check if required fields are present
        if (!loanName || !startDate || !endDate || !interest || !overdue) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Create a new loan document
        const response = await db.collection('loan').add({
            loanName,
            startDate,
            endDate,
            interest,
            overdue,
        });

        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateLoan = async (req, res) => {
    try {
        const { id, newData } = req.body;

        // Check if id is valid
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing id parameter' });
        }

        // Check if the loan document exists
        const loanDoc = await db.collection('loan').doc(id).get();
        if (!loanDoc.exists) {
            return res.status(404).json({ error: 'Loan document not found' });
        }

        // Update the loan document
        const loanRef = await db.collection('loan').doc(id).update(newData);

        res.json({ success: true, loanRef });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllLoans = async (req, res) => {
    try {
        const response = await db.collection('loan').get();
        let responseArr = [];
        response.forEach((doc) => {
            responseArr.push({ id: doc.id, ...doc.data() });
        });
        res.send(responseArr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getLoanById = async (req, res) => {
    try {
        const loanId = req.params.id;
        const loanRef = db.collection('loan').doc(loanId);
        const response = await loanRef.get();

        if (!response.exists) {
            return res.status(404).json({ error: 'Loan document not found' });
        }

        res.send({ id: response.id, ...response.data() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createLoan,
    updateLoan,
    getAllLoans,
    getLoanById,
};
