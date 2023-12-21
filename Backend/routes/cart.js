const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Create Cart



router.post('/', verifyToken, async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist for the user, create a new one
      const newCart = new Cart({
        userId,
        products: [{ productId, quantity }]
      });

      const savedCart = await newCart.save();
      return res.status(200).json(savedCart);
    }

    // If cart exists for the user, check if the product is already in the cart
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId === productId
    );

    if (existingProductIndex !== -1) {
      // If the product exists in the cart, update the quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      cart.products.push({ productId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// // Upadte Cart 

// router.put ("/:id" , verifyTokenAndAuthorization , async(req,res) => {
//     console.log(req.params);
//     try {
//         const updatedCart = await Cart.findByIdAndUpdate(req.params.id , {
//             $set : req.body
//         },{new : true});
//         res.status(200).json(updatedCart);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// });


router.delete('/:userId/:productId', verifyToken, async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity, removeEntirely } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId === productId
    );

    if (existingProductIndex !== -1) {
      if (removeEntirely || quantity >= cart.products[existingProductIndex].quantity) {
        // Remove the entire product from the cart
        cart.products.splice(existingProductIndex, 1);
      } else {
        // Decrease the quantity of the product
        cart.products[existingProductIndex].quantity -= quantity;
        if (cart.products[existingProductIndex].quantity <= 0) {
          // Remove the product if the quantity reaches less than zero
          cart.products.splice(existingProductIndex, 1);
        }
      }

      const updatedCart = await cart.save();
      return res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get User Cart 
router.get("/:userId" , verifyTokenAndAuthorization, async(req,res) =>{
    try {
        const cart = await Cart.findOne({ userId : req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get all Carts

router.get("/" , verifyTokenAndAdmin, async(req ,res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
});





module.exports = router;