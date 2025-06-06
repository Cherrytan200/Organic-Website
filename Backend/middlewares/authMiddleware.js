import jwt from 'jsonwebtoken';

export const authMiddleware = async(req,res,next)=>{
    const {accessToken}=req.cookies
    if (!accessToken) {
        return res.status(409).json({error:"Please Login First"});
    } else {
        try{
            const deCodeToken=await jwt.verify(accessToken,process.env.SECRET)
            req.role=deCodeToken.role
            req.id=deCodeToken.id
            next()
        }
        catch(err){
            return res.status(409).json({error:"Please Login First"});
        }
    }
}


