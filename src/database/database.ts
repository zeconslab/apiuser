import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/api", {
  })
  .then((db) => console.log("Database is online"))
  .catch((err) => console.log(err));
