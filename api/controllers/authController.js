const User = require('../models/User');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
const authController =({
     register : async (req,res)=>{
         var user =req.body;
      
         try {
            user = {...user,password : CryptoJS.AES.encrypt(req.body.password, process.env.SEC_KEY).toString()}
            
             const newUser = new User(user);
               await newUser.save();
               res.status(200).json(newUser);
         } catch (error) {
            res.status(500).json({error});
         } 
     } ,
     login : async (req,res)=>{
        try{
            const user = await User.findOne(
                {
                    username: req.body.username
                }
            );   
            if(!user) return res.status(401).json("Wrong User Name");    
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.SEC_KEY
            );
            
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);           
            const inputPassword = req.body.password;
            
            if( originalPassword != inputPassword){

                return res.status(401).json("Wrong Password");   
            }
                
               const{password , ...other} = user._doc;
             const accessToken = JWT.sign( other, process.env.JWT_KEY,{expiresIn :'3d'})
            res.status(200).json({other,accessToken});
    
        }catch(err){
            res.status(500).json(err);
        }
    }

})
module.exports = authController