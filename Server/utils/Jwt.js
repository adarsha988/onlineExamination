 import jwt from "jsonwebtoken";
 
export const generateJWT=async(payload)=>{

const response= await jwt.sign(
    {
        data:payload
    },process.env.key,{
        expiresIn:'24h'
    }
)
return response;
}
export const verifyJWT=(token)=>{
    try{
        return jwt.verify(token,process.env.key);
 }
 catch(err){
    throw new Error("unauthorized access");
 }
}


