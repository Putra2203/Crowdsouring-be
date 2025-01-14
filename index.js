const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const usersRoute = require("./routes/users");
const reportsRoute = require("./routes/reports");

const app = express();
connectDB();

const corsOrigin = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));

app.use(bodyParser.json());

app.use("/api/users", usersRoute);
app.use("/api/reports", reportsRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
