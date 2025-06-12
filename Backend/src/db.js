const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoUsername = process.env.MONGO_DB_USERNAME;
const mongoPassword = process.env.MONGO_DB_PASSWORD;
const mongoHost = process.env.MONGO_DB_HOST;
const mongoAppName = process.env.MONGO_DB_APP_NAME;

if (!mongoUsername || !mongoPassword || !mongoHost || !mongoAppName) {
  console.log("Missing required MongoDB environment variables.");
  process.exit(1);
}

// const mongoURI = `mongodb://${mongoUser}:${mongoPort}/${mongoDB}`;
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoHost}/?retryWrites=true&w=majority&appName=${mongoAppName}`;

const connectToDataBase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas connection established.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = { connectToDataBase };
