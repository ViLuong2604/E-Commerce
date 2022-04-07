const JWT = require('jsonwebtoken')

const verifyToken =(req,res,next)=>{
     const authHeaders = req.headers.token;
    
        
         if (authHeaders) {
             const token = authHeaders.split(" ")[1];
             JWT.verify(token, process.env.JWT_KEY,(err,user)=>{
                 if(err) res.status(500).json("token is valid...");
                 req.user = user;
              
                 next();
             })
         }else{
           return res.status(401).json("You are not authenticated!");

         }
    
}
const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if (req.user._id == req.params.id || req.user.isAdmin) {
            next();
        }else{
            res.status(403).json("You are not alowed to do that!");
        }
    })
}
const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if ( req.user.isAdmin) {
            next();
        }else{
            res.status(403).json("You are not alowed to do that!");
        }
    })
}
module.exports ={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}