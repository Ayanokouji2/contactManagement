const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || password.length < 8) {
        res.status(400);
        throw new Error(
            "Please provide all fields accoring to the requirements"
        );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        res.status(409);
        throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        username,
        email,
        password: hashPassword,
    });

    res.status(201).json({
        message: "User registered Successfully ",
        User: [user._id, user.email],
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
        {
            user: {
                id: user._id,
                email: user.email,
                name: user.username,
            },
        },
        process.env.SECRET_KEY,
        { expiresIn: "30m" }
    );
    // console.log(token);
    res.status(200).json({
        message: " User Logged In",
        token,
    });
});

// Making This Route Protected
const currentUser = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: " User Current",
        User : req.user
    });
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};
