const express = require ("express") ;
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');




const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DataBase connected succesfully")).catch((err)=> console.log("failed to connect DataBase"));

const port = process.env.PORT || 5000;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute =require("./routes/order");
const stripeRoute = require("./routes/stripe")


const cors = require("cors");

app.use(express.json());
app.use(cors())

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname,'public')));

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

// app.use(multer ({dest : 'uploads'}).single('image'))
app.use("/api/users" , userRoute);
app.use("/api/auth" ,authRoute );
app.use("/api/products" ,productRoute );
app.use("/api/carts" , cartRoute);
app.use("/api/orders" ,orderRoute );
app.use("/api/stripe" ,stripeRoute)



app.listen(port , () => {
    console.log(`Backend sever is running ${port}`)
});

 