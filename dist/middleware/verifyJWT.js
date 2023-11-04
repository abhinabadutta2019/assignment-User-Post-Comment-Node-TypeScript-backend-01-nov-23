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
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
//
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({ message: "no token found" });
        }
        //
        console.log(req.headers.authorization, "req.headers.authorization from verifyJWT");
        //
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        //
        const result = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log(result, "result");
        const userID = result._id;
        //sending the user._id in the routes
        req.user = yield User_1.User.findOne({ _id: userID }).select("_id");
        // req.user = await User.findOne({ _id: userID });
        // console.log(req.user, "user");
        // console.log(_id, "_id");
        next();
        //
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: "Request is not authorized" });
    }
});
exports.verifyJWT = verifyJWT;
