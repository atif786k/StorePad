const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPort = process.env.MONGO_PORT;
const mongoDB = process.env.MONGO_DB;

if (!mongoUser || !mongoPort || !mongoDB) {
  console.log("Missing required MongoDB environment variables.");
  process.exit(1);
}

const mongoURI = `mongodb://${mongoUser}:${mongoPort}/${mongoDB}`;

const connectToDataBase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connection established.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = { connectToDataBase };
