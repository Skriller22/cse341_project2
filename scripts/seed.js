const mongodb = require("../data/database");
const states = require("../data/seed/states.json");
const counties = require("../data/seed/counties.json");

mongodb.initDb(async (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    try {
        const db = mongodb.getDb().db();

        const stateResult = await db.collection('State').deleteMany({});
        const countyResult = await db.collection('County').deleteMany({});
        console.log(`Cleared ${stateResult.deletedCount} state document(s) and ${countyResult.deletedCount} county document(s).`);

        const stateInsert = await db.collection('State').insertMany(states);
        const countyInsert = await db.collection('County').insertMany(counties);
        console.log(`Inserted ${stateInsert.insertedCount} state document(s) and ${countyInsert.insertedCount} county document(s).`);

        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
