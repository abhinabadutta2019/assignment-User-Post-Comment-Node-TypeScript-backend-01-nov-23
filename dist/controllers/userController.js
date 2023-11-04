"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getAllUser = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id: _id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
//
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({});
        res.json({ users: users });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
exports.getAllUser = getAllUser;
//
// Controller function to register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Create a new user
        const newUser = new User_1.User({
            username,
            password,
        });
        // Save the user to the database
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json(error); // Handle any validation or database errors
    }
});
exports.registerUser = registerUser;
// Controller function to log in an existing user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = yield User_1.User.findOne({ username });
        // Check if the user exists and compare passwords
        if (user && user.password === password) {
            // creating token
            const token = createToken(user._id.toString());
            res.status(200).json({ token: token });
            //
            //
        }
        else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    }
    catch (error) {
        res.status(400).json(error); // Handle any errors
    }
});
exports.loginUser = loginUser;
