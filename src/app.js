const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("dashboard!");
});

app.use("/l", (req, res) => {
  res.send("hxfucx");
});

app.listen(3000, () => {
  console.log("Server is listening on 3000");
});
