import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
let url=process.env.MONGO;

mongoose
.connect(url)
.then(()=>{
    console.log('Connected to MONGODB');
})
.catch((err)=>{
    console.log("Error ",err);
})


const app=express();

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
