import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';



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


app.use('/api/user',userRoutes);


app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
