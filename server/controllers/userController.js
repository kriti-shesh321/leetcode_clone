import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Submission from '../models/Submission.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// @desc register a new user(signUp)
// @route POST api/v1/user/signup
export const signup = async (req, res, next) => {
    const { username, email, password, isAdmin } = req.body;
    try {
        if (!username || !email || !password) return res.status(400).json({ message: 'Username, Email and password are required!' });
        // Check if the email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        const newUser = new User({
            username,
            email,
            password,
            isAdmin,
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, JWT_SECRET, { expiresIn: '2h' });
        res.status(201).json({
            message: "User registered successfully.",
            token: token,
            user: {
                id: newUser._id,
                isAdmin: newUser.isAdmin
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc login
// @route POST api/v1/user/login
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required!' });

        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ error: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Incorrect password!' });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({
            message: "Login successful.",
            token: token,
            user: {
                id: user._id,
                isAdmin: user.isAdmin
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc get details of logged in user
// @route GET api/v1/user/user-details
export const getUserDetail = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.status(404).json({ message: "User not found." });
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error." });
    }
};

// @desc update details of logged in user
// @route PUT api/v1/user/user-details
export const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { email, password } = req.body;

        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(409).json({ message: 'Email already in use.' });
            }
        }

        const currentUser = await User.findOne({ _id: userId });
        if (!currentUser) return res.status(404).json({ message: "User not found." });

        //update the fields
        if (email) currentUser.email = email;
        if (password) currentUser.password = password;
        await currentUser.save();

        res.status(200).json({ message: "User details updated successfully.", currentUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error." });
    }
};

//@desc Delete task
//@route DELETE api/v1/user/user-details
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // Delete associated submissions
        await Submission.deleteMany({ userId });
        
        const user = await User.findOneAndDelete({ _id: userId });
        if (!user) return res.status(404).json({ message: "User not found." });
        
        res.status(200).json({ message: "User deleted Successfully!" }, user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error });
    }
};