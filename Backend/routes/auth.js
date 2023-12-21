const User = require("../models/user");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Registration
router.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
        const newUser = new User({ username, password: encryptedPassword, email });
        const savedUser = await newUser.save();
        // Return a response without sensitive information
        return res.status(201).json({ message: "User registered successfully" ,savedUser});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password: psswd } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== psswd) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        }, process.env.JWT_SEC,{expiresIn:"30d"})

        const {password, ...others} = user._doc

        res.status(200).json({ message: "Login successful", others ,accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
