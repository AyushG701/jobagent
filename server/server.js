import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import morgan from "morgan";
import bodyParser from "body-parser";

import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import router from "./routes/index.js";
import dbConnection from "./dbConfig/dbConnection.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

// mongoose connection
dbConnection();

//middlewares
app.use(cors());
app.use(xss());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});