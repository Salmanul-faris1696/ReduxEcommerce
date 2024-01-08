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

// router.put("/:id" , verifyTokenAndAdmin,upload.single("image"), async(req,res) => {
//     try {
//         const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
//             $set : req.body , 
//         },{new :true});
//         res.status(200).json(updateProduct);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

router.put("/:id", verifyTokenAndAdmin, upload.single("image"), async (req, res) => {
    try {
        const existingProduct = await Product.findById(req.params.id);
console.log({img: req.file});
        // If there's an uploaded image, update the image filename
        const updatedImage = req.file && req.file.filename ;
        console.log({updatedImage, ex:existingProduct.image});

        // If there's an old image file and it's different from the new one, delete it
        if (req.file && existingProduct.image && req.file.filename !== existingProduct.image) {
            console.log("existing");
            fs.unlink(`uploads/products/${existingProduct.image}`, (err) => {
                if(err){
                    console.log("Error deleting file", err.message);
                }
                console.log("Success delete");
            } );
        }

        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body, image: updatedImage } },
            { new: true }
        );

        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});




//Delete products

router.delete("/:id" , verifyTokenAndAdmin , async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "product has been deleted"});
    } catch (error) {
        res.status(500).json(error);
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
        res.status(500).json(error);
        
    }
})
module.exports = router