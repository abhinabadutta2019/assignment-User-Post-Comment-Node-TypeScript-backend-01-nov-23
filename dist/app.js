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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors")); // Import the cors package
//
const user_1 = require("./routers/user");
const post_1 = require("./routers/post");
//
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware to parse JSON requests
dotenv_1.default.config();
app.use((0, cors_1.default)()); // Enable CORS for all routes
//
///////mongoDB cloud//////////////////
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/assign-task-comments-typesc-nov-23?retryWrites=true&w=majority`;
//
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //if mongoDB uri is correct
            //if it is connected
            yield mongoose_1.default.connect(uri);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            //if error in connection or - in mongoDB uri
            console.error("MongoDB connection error:", error);
        }
    });
}
// Call the async function to connect to MongoDB
connectToMongoDB();
////////////////////////////////////////////
console.log("Hi1");
app.get("/", (req, res) => {
    res.send("Hello2");
});
//
// routes
app.use("/users", user_1.userRouter);
app.use("/posts", post_1.postRouter);
//
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`server running at ${PORT}`));
//
