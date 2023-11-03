import { Router } from "express";
const router = Router();
import { createPost } from "../controllers/postController";
import { verifyJWT } from "../middleware/verifyJWT";

// Define a route for creating a new post
router.post("/", verifyJWT, createPost);

export { router as postRouter };
