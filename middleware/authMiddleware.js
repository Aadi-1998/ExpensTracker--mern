const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) =>{
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if(!token)
    { return res.status(401).json({message: "no token, failed auth"});}
    
    try{

        const decode = jwt.verify(token,'secretKey')
        req.userid=decode.id //attaching decode to user info  to request
        console.log(`yes ${req.userid}`)
        // return res.status(201).json({message:"token is valid"})
        next(); 

    }catch{
        return res.status(401).json({message:"token is not valid"})
    }



}

module.exports = authMiddleware;