import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import connection from "./monogo_config.js";
connection(process.env.MONGO_URL)
import morgan from "morgan";
import cors from 'cors';
import UserRouter from './routes/user.js';
import TourRouter from './routes/tour.js';
const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))



app.use("/user", UserRouter);
app.use("/tour", TourRouter);
app.get("/", (req, res) => { res.send("hello world") })



app.listen(5000, () => console.log('server is running at port 5000'))