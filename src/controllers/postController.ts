import { Request, Response } from "express";
import { Post } from "../models/Post"; // Import the Post model
import { User } from "../models/User"; // Import the User model

//
interface CustomRequest extends Request {
  //as no question mark - was the reason of error
  user?: any; // Replace 'any' with the actual user data type
}
//

// Controller function to create a new post
const createPost = async (req: CustomRequest, res: Response) => {
  try {
    //
    // console.log(req.user, "req.user");

    const middlewareUser = req.user;
    console.log(middlewareUser, "middlewareUser");

    //
    const { content } = req.body;

    // Create a new post
    const newPost = new Post({
      content: content,
      user: middlewareUser,
      comments: [],
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json(error); // Handle any validation or database errors
  }
};
//
const addComment = async (req: CustomRequest, res: Response) => {
  try {
    //
    const postId = req.params.postId;

    const middlewareUser = req.user;
    console.log(middlewareUser, "middlewareUser");

    const { comment } = req.body;
    //
    // Find the post by its ID
    const post = await Post.findById(postId);
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
    await post.save();

    //
    return res
      .status(201)
      .json({ message: "Comment added successfully", post });

    //
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createPost, addComment };
