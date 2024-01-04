const jwt = require("jsonwebtoken");


const verifyToken = (req,res, next) => {
    const authHeader = req.headers.authorization; 
    console.log(authHeader);
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token , process.env.JWT_SEC ,
             (err , user) => {
                if(err){
                    return res.status(403).json({message : "inavalid token "});
                }
                req.user = user;
                next();
        });
    }
    else{
        return res.status(401).json({message : "you are not authenticated !!"});
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res , ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message : "you unable to do that .sorry !!"});
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) =>{
    verifyToken(req, res ,()=> {
        console.log("user :",req.user);
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json({message : "you cannot do that action "})
        }
    })
}

module.exports = {verifyToken , verifyTokenAndAuthorization , verifyTokenAndAdmin }