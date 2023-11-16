const db = require('../config/firebase.js');

const createUser = async (req, res) => {
    try {
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        const response = await db.collection('users').add(userJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const userRef = db.collection('users');
        const response = await userRef.get();
        let responseArr = [];
        response.forEach((doc) => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
};

const getUserById = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    } catch (error) {
        res.send(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.body.id;
        const newFirstName = req.body.newFirstName;

        if (!id || !newFirstName) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const userRef = await db.collection('users').doc(id).update({
            firstName: newFirstName,
        });

        res.json({ success: true, userRef });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await db.collection('users').doc(id).delete();
        res.json({ success: true, response });
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
