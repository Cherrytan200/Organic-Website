import mongoose from "mongoose";

export const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Database connected..")
    }
    catch(error){
        console.log(error.message);
    }
}