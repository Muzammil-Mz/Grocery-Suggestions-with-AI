import mongoose from "mongoose";
import config from "config";

let dbUrl = config.get("DB_URL");

let dbConnect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("DB conncedted successfully");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();
