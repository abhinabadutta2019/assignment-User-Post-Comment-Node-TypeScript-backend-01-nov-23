import { Request, Response } from "express";
import { Post } from "../models/Post"; // Import the Post model
import { User } from "../models/User"; // Import the User model

//

// Controller function to create a new post
const createPost = async (req: Request, res: Response) => {
  try {
    const { content, username } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new post
    const newPost = new Post({
      content,
      user: user._id,
      comments: [],
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json(error); // Handle any validation or database errors
  }
};

export { createPost };
