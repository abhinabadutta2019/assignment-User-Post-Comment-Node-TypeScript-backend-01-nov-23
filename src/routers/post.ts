import { Router } from "express";
const router = Router();
import {
  createPost,
  addComment,
  ownAllPost,
  allPosts,
} from "../controllers/postController";
//
import { verifyJWT } from "../middleware/verifyJWT";

// Define a route for creating a new post
router.post("/", verifyJWT, createPost);
//
router.post("/comment/:postId", verifyJWT, addComment);
//
router.get("/ownPosts", verifyJWT, ownAllPost);
//
router.get("/", allPosts);
export { router as postRouter };
