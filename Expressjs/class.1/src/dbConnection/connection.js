const mongoose = require('mongoose');
const { config } = require('../configs/server.config');
const connectionString = config.dbURI;
const connectDatabase = async () => {
    try {
      await mongoose
        .connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("Connected to MongoDB database successfully.");
        })
        .catch((error) => {
          console.log("Error connecting to MongoDB: ", error.message);
        });
    } catch (error) {
      console.log("Database connection error: ", error.message);
    }
  };
module.exports = connectDatabase;
