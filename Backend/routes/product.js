const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router()
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products')
  },
filename: function (req, file, cb) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const fileExtension = file.originalname.split('.').pop(); // Extract file extension
  const finalFileName = `${file.fieldname}-${uniqueSuffix}.${fileExtension}`; // Add extension to filename
  cb(null, finalFileName);
}

})



const upload = multer({ storage: storage })

//Create product

router.post("/" ,verifyTokenAndAdmin,upload.single("image"), async(req,res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        const newProduct = new Product({...req.body, image: req.file.filename});
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);        
    } catch (error) {
          res.status(500).json(error);
    }
});

//

router.get("/images/:imgurl", (req, res) => {
  const imageName = req.params.imgurl;
  const imagePath = path.join('uploads/products', imageName);
  
  // Use path.resolve to get the absolute path
  const absolutePath = path.resolve(imagePath);

  console.log({ imageName, imagePath, absolutePath });

  res.sendFile(absolutePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Internal Server Error');
    }
  });
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
        console.log(req.params.id);
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
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