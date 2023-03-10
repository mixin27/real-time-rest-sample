import mongoose from "mongoose";
import { DB_URL } from "../config/variables.js";

mongoose.connect(DB_URL).then((result) => {
  console.log(DB_URL);
  console.log(`😃 DB up and running`);
});
