const mongoose = require("mongoose");
require("dotenv").config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4
        });

        console.log("✅ Connected Successfully");
        process.exit(0);

    } catch (err) {

        console.error(err);
        process.exit(1);

    }
}

test();