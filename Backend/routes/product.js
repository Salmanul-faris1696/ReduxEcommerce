const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router()


//Create product

router.post("/" ,verifyTokenAndAdmin, async(req,res) => {
    try {
        console.log(req.body);
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);        
    } catch (error) {
          res.status(500).json(error);
    }
});

// Update product

router.put("/:id" , verifyTokenAndAdmin, async(req,res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new :true});
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json(err);
    }
});

//Delete products

router.delete("/:id" , verifyTokenAndAdmin , async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "product has been deleted"});
    } catch (error) {
        res.status(500).json(err);
    }
});

// Get a Product 

router.get("/find/:id" ,  async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(err);
    }
});

// Get all Products

router.get("/" , async(req, res) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        // console.log(qNew,qCategory);
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt : -1}).limit(5);      
        }else if(qCategory){
            products = await Product.find({categories : {
                $in : [qCategory]
            }});

        }else{
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(err);
        
    }
})
module.exports = router