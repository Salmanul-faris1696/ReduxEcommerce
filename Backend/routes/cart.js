const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// Create Cart





router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id

    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      const existingItemIndex = existingCart.cartItems.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingItemIndex !== -1) {
        existingCart.cartItems[existingItemIndex].quantity += quantity;
      } else {
        existingCart.cartItems.push({ product: productId, quantity });
      }

      await existingCart.save();
      const populatedCart = await Cart.findById(existingCart._id).populate("cartItems.product");
      console.log({ populatedCart });
      res.status(200).json(populatedCart);
    } else {
      const newCart = await Cart.create({
        userId,
        cartItems: [{ product: productId, quantity }],
      });
      const populatedCart = await Cart.findById(newCart._id).populate("cartItems.product");
      res.status(201).json(populatedCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});




router.delete('/:productId', verifyToken, async (req, res) => {
  const { productId } = req.params;
  const { quantity, removeEntirely } = req.body;
  const userId = req.user.id
  try {
    let cart = await Cart.findOne({ userId });
    console.log({
      quantity, removeEntirely,
      productId, cart: cart.cartItems.map(
        // (product) => String(product.product) === productId
        (product) => product

      )
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingProductIndex = cart.cartItems.findIndex(
      (product) => String(product.product) === productId

    );

    if (existingProductIndex !== -1) {
      console.log("128 ::", removeEntirely || quantity >= cart.cartItems[existingProductIndex].quantity);
      if (removeEntirely || quantity >= cart.cartItems[existingProductIndex].quantity) {
        // Remove the entire product from the cart
        cart.cartItems.splice(existingProductIndex, 1);
      } else {
        // Decrease the quantity of the product
        cart.cartItems[existingProductIndex].quantity -= quantity;
        if (cart.cartItems[existingProductIndex].quantity <= 0) {
          // Remove the product if the quantity reaches less than zero
          cart.cartItems.splice(existingProductIndex, 1);
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
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("cartItems.product");
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all Carts
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find().populate("cartItems.product");
    res.status(200).json(carts);

  } catch (error) {
    res.status(500).json(error);

  }
});





module.exports = router;