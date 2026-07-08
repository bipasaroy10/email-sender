const mongoose = require("mongoose");


// ✅ Apply DNS fix only in development
if (process.env.NODE_ENV === "development") {
  const dns = require("dns");
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
  console.log("🌐 Custom DNS applied (development mode)");
}


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${connection.connection.host}`);

    } catch (error) {

        console.log("Database Connection Error");

        console.log(error.message);

        process.exit(1);
    }
};

module.exports = connectDB;