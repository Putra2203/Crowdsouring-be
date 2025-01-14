const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const usersRoute = require("./routes/users");
const reportsRoute = require("./routes/reports");

const app = express();
connectDB();

// Konfigurasi CORS
app.use(cors({
  origin: "https://crowdsourcing-banjir-fe-production.up.railway.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], 
}));

// Penanganan preflight request
app.options("*", cors());

// Middleware tambahan
app.use(bodyParser.json());

// Rute API
app.use("/api/users", usersRoute);
app.use("/api/reports", reportsRoute);

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));