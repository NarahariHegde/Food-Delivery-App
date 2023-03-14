const express = require("express");
const app = express();
const port = 3001 || process.env.PORT;
const bodyparser = require("body-parser");
require("dotenv").config();
app.use(bodyparser.json());
require("../Backend/Db/conn");
app.get("/", (req, res) => {
  res.end("welcome to backend");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With,Content-Type,Accept"
  );
  next();
});
app.use(express.json());
app.use("/api", require("./Routes/Createuser"));
app.use("/api", require("./Routes/Displayuser"));
app.listen(port, () => {
  console.log(`server running....at :${port}`);
});
