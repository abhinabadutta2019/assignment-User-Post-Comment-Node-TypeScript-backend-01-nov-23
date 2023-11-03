import { Router } from "express";
const router = Router();
import { createPost, addComment } from "../controllers/postController";
import { verifyJWT } from "../middleware/verifyJWT";

// Define a route for creating a new post
router.post("/", verifyJWT, createPost);
//
router.post("/comment/:postId", verifyJWT, addComment);

export { router as postRouter };
