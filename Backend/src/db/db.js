const mongoose = require("mongoose");
const config = require("../Config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("Connected to database ✅");
  } catch (err) {
    console.log("Cannot connect to database ❌");
  }
};

module.exports = connectDB;
