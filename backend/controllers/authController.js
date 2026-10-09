const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            token: generateToken(user._id, user.role),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Login User
exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        res.json({

            success: true,

            message: "Login Successful",

            token: generateToken(user._id, user.role),

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// Get Logged-in User
exports.profile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};