const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const cors = require("cors");

mongoose
  .connect(process.env.MONGODB_URL || process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((e) => {
    console.log(e);
  });

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", authRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port 8080.");
});
