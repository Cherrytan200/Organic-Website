import formidable from "formidable";
import { responseReturn } from "../../utils/response.js";
import { v2 as cloudinary } from 'cloudinary';
import productModel from "../../Models/productModel.js";

export const add_product=async(req,res)=>{
    const {id}=req;

    const form=formidable({multiples:true})
    form.parse(req,async(err,field,files)=>{
        let {name,category,description,stock,price,discount,shopName}=field;
        const {images}=files;
        name=name.trim();
        const slug=name.split(' ').join('-')
        // console.log(images);
        cloudinary.config({
            cloud_name:process.env.cloud_name,
            api_key:process.env.api_key,
            api_secret:process.env.api_secret,
            secure:true
        })

        try {
            let allImageUrl=[];
            if (!Array.isArray(images)) {
                images = [images]; 
            } 
            for(let i=0;i<images.length;i++){
                const result=await cloudinary.uploader.upload(images[i].filepath,{folder:'products'});
                allImageUrl.push(result.url);
                // console.log(allImageUrl);
            }
            await productModel.create({
                sellerId:id,
                name,
                slug,
                shopName,
                category:category.trim(),
                description:description.trim(),
                stock:parseInt(stock),
                price:parseInt(price),
                discount:parseInt(discount),
                images:allImageUrl

            })
            responseReturn(res,201,{message:'Product Added Successfully '})
        } catch (error) {
            responseReturn(res,500,{error:error.message})
        }
    })
}