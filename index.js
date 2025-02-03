const express = require("express");
const cors = require("cors");
const numberRoutes = require("./routes/numberRoutes");
const rootRoutes = require("./routes/routeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", rootRoutes);
app.use("/api", numberRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
