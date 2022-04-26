const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  console.log(process.env.MONGO_URL);
  const database = await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  });
  if (database) {
    console.log("Connected to database");
  }
};

module.exports = connectDB;
