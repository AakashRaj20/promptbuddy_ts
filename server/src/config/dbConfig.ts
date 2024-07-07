import mongoose, { ConnectOptions } from "mongoose";
import { registerModels } from "../models/index";
import * as dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise;

const mongouri: string = process.env.MONGODB_URI as string;
const collectionName: string = process.env.COLLECTION_NAME as string;

const dbOptions = {
  useNewUrlParser: true,
  dbName: collectionName,
} as ConnectOptions;

export const connectDb = () => {
  mongoose
    .connect(mongouri, dbOptions)
    .then(() => {
      registerModels();
      console.log("Database Connected Successfully!!");
    })
    .catch((err) => {
      console.error("Could not connect to the database", err);
      process.exit(1);
    });
};

//User
