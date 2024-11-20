const mongoose = require("mongoose");

async function conCompassDB(uri) {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.log(`ERROR - from connectDB: ${err.message}`);
  }
}

module.exports = { conCompassDB };
