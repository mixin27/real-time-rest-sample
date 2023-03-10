import dotenv from "dotenv";

dotenv.config();

const DB_URL = `${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`;
const PORT = process.env.PORT || 5000;

export { DB_URL, PORT };
