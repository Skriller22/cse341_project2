const mongodb = require("../data/database");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const county = await db.db().collection('County').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(county);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving county data.' });
    }
}

const getById = async (req, res) => {
    const countyId = new ObjectId(req.params.id);
    try {
        const db = mongodb.getDb();
        const county = await db.db()
        .collection('County')
        .findOne({ _id: countyId });

        if (!county) {
            return res.status(404).json({ error: 'County not found.' });
        }
        res.status(200).json(county);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving the county data.' });
    }
};

const createCounty = async (req, res) => {
    const newCounty = req.body;
    try {
        const db = mongodb.getDb();
        const result = await db.db().collection('County').insertOne(newCounty);
        res.status(201).json({ message: 'County created successfully', id: result.insertedId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the county.' });
    }
};

const updateCounty = async (req, res) => {
    const countyId = new ObjectId(req.params.id);
    const updatedCounty = req.body;

    try {
        const db = mongodb.getDb();
        const result = await db.db().collection('County').updateOne(
            { _id: countyId },
            { $set: updatedCounty }
        );
    
    if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'County not found.' });
    }

    res.status(200).json({ message: 'County updated successfully' });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the county.' });
    }
};

const deleteCounty = async (req, res) => {
    const countyId = new ObjectId(req.params.id);

    try {
        const db = mongodb.getDb();
        const result = await db.db().collection('County').deleteOne({ _id: countyId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'County not found.' });
        }
        res.status(200).json({ message: 'County deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the county.' });
    }
};

module.exports = {
    getAll,
    getById,
    createCounty,
    updateCounty,
    deleteCounty
};