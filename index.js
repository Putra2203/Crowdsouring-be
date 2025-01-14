const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const usersRoute = require("./routes/users");
const reportsRoute = require("./routes/reports");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", usersRoute);
app.use("/api/reports", reportsRoute);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
