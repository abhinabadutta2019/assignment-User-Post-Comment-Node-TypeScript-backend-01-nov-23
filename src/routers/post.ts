import { Router } from "express";
const router = Router();
import { createPost } from "../controllers/postController";

// Define a route for creating a new post
router.post("/create", createPost);

export { router as postRouter };
