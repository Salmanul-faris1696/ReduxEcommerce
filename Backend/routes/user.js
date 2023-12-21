const User = require("../models/user");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router()


//update
router.put("/:id" ,verifyTokenAndAuthorization , async(req, res)=> {
    if(req.body.password){
        req.body.password  = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

    }
    try {
        const upadteUser = await User.findByIdAndUpdate(req.params.id , {
            $set : req.body 
        } ,{new:true})
        return res.status(200).json(upadteUser)
    } catch (error) {
        res.status(500).json(err)
        
    }
} )

//Delete
router.delete("/:id" ,verifyTokenAndAuthorization, async(req , res) =>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message : " user has been deleted "})
        
    } catch (error) {
        res.status(500).json(err)  
    }

})

//Get User
router.get("/find/:id" ,verifyTokenAndAdmin, async(req , res) =>{
    try {
        const user = await User.findById(req.params.id)
        const {passowrd , ...others} =user._doc
        res.status(200).json(others)
        
    } catch (error) {
        res.status(500).json(err)  
    }

})

//Get all user
router.get("/" , verifyTokenAndAdmin , async(req, res)=> {
    const query = req.query.new;

    try {
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json(err)
        
    }
})

//Get user Stats 
router.get("/stats", verifyTokenAndAdmin , async(req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    try {
        const data = await User.aggregate([
            { $match : {createdAt : {$gte : lastYear}}},
            { $project :{month : { $month : "$createdAt"},},},
            { $group : {_id : "$month" ,total : { $sum : 1}}}
        ]);
        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json(err)
        
    }
})

module.exports = router
