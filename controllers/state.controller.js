const mongodb = require("../data/database");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const state = await db.db().collection('State').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(state);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving state data.' });
    }
}

const getById = async (req, res) => {
    const stateId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDb();
        const state = await db.db()
        .collection('State')
        .findOne({ _id: stateId });

        if (!state) {
            return res.status(404).json({ error: 'State not found.' });
        }
        res.status(200).json(state);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving the state data.' });
    }
};

const createState = async (req, res) => {
    const newState = req.body;
    try {
        const db = mongodb.getDb();
        const result = await db.db().collection('State').insertOne(newState);
        res.status(201).json({ message: 'State created successfully', id: result.insertedId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the state.' });
    }
};

const updateState = async (req, res) => {
    const stateId = new ObjectId(req.params.id);
    const updatedState = req.body;

    try {
        const db = mongodb.getDb();
        const result = await db.db().collection('State').updateOne(
            { _id: stateId },
            { $set: updatedState }
        );

    if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'State not found.' });
    }

    res.status(200).json({ message: 'State updated successfully' });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the state.' });
    }
};

const deleteState = async (req, res) => {
    const stateId = new ObjectId(req.params.id);

    try {
        const db = mongodb.getDb();
        const result = await db.db().collection('State').deleteOne({ _id: stateId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'State not found.' });
        }
        res.status(200).json({ message: 'State deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the state.' });
    }
};

module.exports = {
    getAll,
    getById,
    createState,
    updateState,
    deleteState
};
