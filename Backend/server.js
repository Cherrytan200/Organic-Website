import express from "express";
import "dotenv/config";
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { dbConnect } from "./utils/db.js";
const app=express();
const port=process.env.PORT || 5000
dbConnect();

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api',authRoutes);
app.get("/",(req,res)=>res.send('My Backend'))
app.listen(port,()=>
    console.log(`Server started on port: ${port}`)
);