const express = require("express");
const cors = require("cors");
const rootRoutes = require("./routes/routeRoutes");
const numberRoutes = require("./routes/numberRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", rootRoutes);
app.use("/api", numberRoutes);

module.exports = app;
