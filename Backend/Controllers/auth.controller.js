import User from '../Models/user.model.js'
import bcryptjs from 'bcryptjs';

export const signup=async (req,res)=>{
    const {username,email,password,location}=req.body;
    if(!username || !email || !password || !location || username==='' || email===''){
        return res.status(400).json({message:'All fields are required'});
    }
    else if(password.length<7){
        return res.status(400).json({message:'Password Should be more than 6 Characters'});
    }

    const hashPassword=bcryptjs.hashSync(password,10);

    const newUser=new User({
        username,
        email,
        password:hashPassword,
        location
    });
    try{
        await newUser.save();
        res.send("Signup Successful");
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}