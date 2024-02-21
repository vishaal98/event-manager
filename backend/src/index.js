const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

//start the server
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error Connecting to the server");
    return;
  }
  //connect the DB
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Connected to DB successfully");
    })
    .catch((err) => {
      console.log("DB connection Failed: ", err);
    });
  console.log("Connected to server, Listening to PORT: ", process.env.PORT);
});
