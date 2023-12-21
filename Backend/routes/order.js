const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();

// Create Order

router.post("/" , verifyToken , async(req,res) =>{
    try {
        console.log(req.body);
        const  newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error)
    }
});


// Update order

router.put("/:id" , verifyTokenAndAdmin , async(req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id , {
            $set : req.body
        },{new : true});
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);  
    }
});

//Delete Order

router.delete("/:id" , verifyTokenAndAdmin , async(req,res) =>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "your order has been cancelled"});
    } catch (error) {
        res.status(500).json(err);
    }
});

// Get Order 
router.get("/:userId" , verifyTokenAndAuthorization , async(req,res) =>{
    try {
        const order = await Order.find({userId : req.params.userId});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get all Orders 
router.get("/" , verifyTokenAndAdmin , async (req,res) =>{
    console.log("get all orders");
    try {
            const orders =await Order.find();
            res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error);
    }
});

//Get income stats

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports =router;