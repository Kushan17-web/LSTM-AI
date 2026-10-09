const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("DNS Servers:", dns.getServers());

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;