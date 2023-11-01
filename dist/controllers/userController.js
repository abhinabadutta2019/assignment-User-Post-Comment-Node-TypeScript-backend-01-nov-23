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
const User_1 = require("../models/User");
const userValidator_1 = require("../validators/userValidator");
const zod_validation_error_1 = require("zod-validation-error");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
//
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        console.log(req.body, "req.body of registerUser");
        //
        const { username, password } = req.body;
        //
        //
        const validatedTask = userValidator_1.UserSchema.safeParse({
            username: username,
            password: password,
        });
        //
        if (!validatedTask.success) {
            //zod messa in a string showing
            return res
                .status(400)
                .json({ error: (0, zod_validation_error_1.fromZodError)(validatedTask.error).message });
        }
        //
        const validatedData = validatedTask.data;
        // Generate a salt and hash the user's password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(validatedData.password, salt);
        //
        const user = new User_1.User({
            username: validatedData.username,
            password: hashedPassword,
        });
        yield user.save();
        res.json({ user: user, message: "user created" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    console.log(req.body, "req.body of loginUser");
    //
    try {
        const { username, password } = req.body;
        // need to be findOne(find giving error )
        const user = yield User_1.User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ messsage: "user not found" });
        }
        console.log(user.password, "user");
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        res.status(200).json({ user: user, message: "login successful" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
