const { mongoose, Schema } = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        cartItems: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, default: 1 },
            }
        ]
    }, { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart