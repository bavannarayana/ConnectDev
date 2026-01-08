const mongoose = require("mongoose");

const DATABASE_URL =
  "mongodb+srv://kbavannarayana_db_user:IuNVuwDB5z9wbL4s@mynode.csymf1b.mongodb.net/connectDev";

async function dbConnect() {
  await mongoose.connect(DATABASE_URL);
}
module.exports = dbConnect;
// dbConnect()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));
