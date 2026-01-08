const express = require("express");
const dbConnect = require("./config/database");

const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes.js");
const profileRouter = require("./routes/profile.routes.js");
const requestRouter = require("./routes/request.routes.js");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

dbConnect()
  .then(() => {
    console.log("db Connected");
    app.listen(3000, () => {
      console.log("Server is listening on 3000");
    });
  })
  .catch((error) => console.log(error));

// app.listen(3000, () => {
//   console.log("Server is listening on 3000");
// });
