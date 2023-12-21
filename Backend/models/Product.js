const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema ( 
    {
        title:{ type : String , required:true , unique:true },
        desc: { type : String , required : true },
        price: { type : Number , required : true },
        image:{type : String , required : true},
        categories : {type :Array  },
        size:{type :String   }




    },{timestamps:true}
)

const Product  = mongoose.model("Product" , ProductSchema);



module.exports =Product ;


