require("dotenv").config();

console.log("SEPOLIA_URL:", process.env.SEPOLIA_URL);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Loaded" : "Not Loaded");
