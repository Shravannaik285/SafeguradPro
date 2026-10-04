import adminAuth from "../config/firebaseAdmin.js";
import admin from "../config/firebaseAdmin.js";

const authMiddleware=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message:"Unauthorized:No token provided"
            })
        }
        //extracting token from bearer <token></token>
        const token=authHeader.split(" ")[1];

        //verify it using firebase admin

        const decodedToken=await adminAuth.verifyIdToken(token);

        //store authenticated user's UID in req

        req.userId=decodedToken.uid;
        
        //continue to controller
        next();


    }catch(error){
        console.log("Authentication error: ",error.message);

        return res.status(401).json({
            message:"Unauthorized:Invalid token"
        });

    }
};

export default authMiddleware;