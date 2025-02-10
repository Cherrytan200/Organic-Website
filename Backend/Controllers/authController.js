import adminModel from "../Models/adminModel.js";
import sellerModel from "../Models/sellerModel.js";
import sellerCustomerModel from "../Models/chat/sellerCustomerModel.js";
import { responseReturn } from "../utils/response.js";
import bcrypt from 'bcryptjs'
import { createToken } from "../utils/tokenCreate.js";
import formidable from "formidable";
import { v2 as cloudinary } from 'cloudinary';

export const admin_login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const admin=await adminModel.findOne({email}).select(
            '+password'
        )
        // console.log(admin);
        if (admin) {
            const match=await bcrypt.compare(password,admin.password)
            
            // console.log(match);
            if (match) {
                const token=await createToken({
                    id:admin.id,
                    role:admin.role
                })
                res.cookie('accessToken',token,{
                    expires:new Date(Date.now()+7*24*60*60*1000),
                    
                })
                responseReturn(res,200,{token,message:"Login Success",userInfo:admin})
            } else {
                responseReturn(res,404,{error:"Password not match"})
            }
        } else {
            responseReturn(res,404,{error:"Email not found"});
        }
    }catch(error){
        responseReturn(res,500,{error:error.message})
    }
}


export const seller_login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const seller=await sellerModel.findOne({email}).select(
            '+password'
        )
        // console.log(seller);
        if (seller) {
            const match=await bcrypt.compare(password,seller.password)
            
            // console.log(match);
            if (match) {
                const token=await createToken({
                    id:seller.id,
                    role:seller.role
                })
                res.cookie('accessToken',token,
                    {
                        expires:new Date(Date.now()+7*24*60*60*1000),
                        
                    }
                )
                responseReturn(res,200,{token,message:"Login Success",userInfo:seller})
            } else {
                responseReturn(res,404,{error:"Password not match"})
            }
        } else {
            responseReturn(res,404,{error:"Email not found"});
        }

    }catch(error){
        responseReturn(res,500,{error:error.message})
    }
}


export const seller_register=async(req,res)=>{
    const {email,name,password}=req.body
    try{
        const getUser=await sellerModel.findOne({email})
        if(getUser){
            responseReturn(res,404,{error:'Email Already Exists'})
        }else{
            const seller=await sellerModel.create({
                name,
                email,
                password:await bcrypt.hash(password,10),
                method:'manual',
                shopInfo:{}
            })
            await sellerCustomerModel.create({
                myId:seller.id
            })
            const token=await createToken({
                id:seller.id,role:seller.role
            });
            res.cookie('accessToken',token,
                {
                    expires:new Date(Date.now()+7*24*60*60*1000),
                    
                }
            )
            responseReturn(res,201,{token,message:'Register Success'})
        }
    }catch(error){
        responseReturn(res,500,{error:'Internal Server Error'})
    }

}



export const getUser=async(req,res)=>{
    const {id,role}=req;
    try{
        if(role==='admin'){
            const user=await adminModel.findById(id)
            responseReturn(res,200,{userInfo:user})
        }else{
            const seller=await sellerModel.findById(id)
            console.log(seller);
            responseReturn(res,200,{userInfo:seller})
        }
    }
    catch(error){
        responseReturn(res,500,{error:'Internal Server Error'})
    }
}


export const profile_image_upload=async(req,res)=>{
    const {id}=req
    const form=formidable({multiples:true})
    form.parse(req,async(err,_,files)=>{
        cloudinary.config({
            cloud_name:process.env.cloud_name,
            api_key:process.env.api_key,
            api_secret:process.env.api_secret,
            secure:true
        })
        const {image}=files


        try {
            const result=await cloudinary.uploader.upload(image.filepath,{folder:'profile'})
            if (result) {
                await sellerModel.findByIdAndUpdate(id,{image:result.url})
                const userInfo=await sellerModel.findById(id)
                responseReturn(res,200,{message:'Profile Image Uplouded Successfully',userInfo})

            } else {
                responseReturn(res,404,{error:'Image Upload Failed'})
            }
        } catch (error) {
            responseReturn(res,500,{error:error.message})
        }
    })
}