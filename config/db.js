const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://erdinputraa:putradb22@putradb.cpaej.mongodb.net/flood_crowdsourcing?retryWrites=true&w=majority";

    await mongoose.connect(uri);

    console.log("MongoDB Atlas Connected!");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
