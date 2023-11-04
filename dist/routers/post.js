"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.postRouter = router;
const postController_1 = require("../controllers/postController");
//
const verifyJWT_1 = require("../middleware/verifyJWT");
// Define a route for creating a new post
router.post("/", verifyJWT_1.verifyJWT, postController_1.createPost);
//
router.post("/comment/:postId", verifyJWT_1.verifyJWT, postController_1.addComment);
//
router.get("/ownPosts", verifyJWT_1.verifyJWT, postController_1.ownAllPost);
//
router.get("/", postController_1.allPosts);
