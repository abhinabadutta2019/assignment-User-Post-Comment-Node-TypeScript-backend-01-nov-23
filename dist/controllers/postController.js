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
Object.defineProperty(exports, "__esModule", { value: true });
exports.allPosts = exports.ownAllPost = exports.addComment = exports.createPost = void 0;
const Post_1 = require("../models/Post"); // Import the Post model
//
// Controller function to create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        // console.log(req.user, "req.user");
        const middlewareUser = req.user;
        console.log(middlewareUser, "middlewareUser");
        //
        const { content } = req.body;
        // Create a new post
        const newPost = new Post_1.Post({
            content: content,
            user: middlewareUser,
            comments: [],
        });
        // Save the post to the database
        const savedPost = yield newPost.save();
        res.status(201).json(savedPost);
    }
    catch (error) {
        res.status(500).json(error); // Handle any validation or database errors
    }
});
exports.createPost = createPost;
//
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const postId = req.params.postId;
        const middlewareUser = req.user;
        console.log(middlewareUser, "middlewareUser");
        const { comment } = req.body;
        //
        // Find the post by its ID
        const post = yield Post_1.Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        //
        // Create a new comment object
        const newComment = {
            user: middlewareUser,
            text: comment,
        };
        //
        post.comments.push(newComment);
        // Save the updated post
        yield post.save();
        //
        return res
            .status(201)
            .json({ message: "Comment added successfully", post });
        //
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.addComment = addComment;
//
const ownAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const middlewareUser = req.user;
        // console.log(middlewareUser, "middlewareUser");
        const posts = yield Post_1.Post.find({ user: middlewareUser._id });
        if (!posts) {
            return res.status(404).json({ message: "No posts found for this user" });
        }
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.ownAllPost = ownAllPost;
//
const allPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.Post.find()
            .populate({ path: "user" });
        // console.log(posts, "posts--allPosts ");
        if (!posts) {
            return res.status(404).json({ message: "No posts found" });
        }
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.allPosts = allPosts;
