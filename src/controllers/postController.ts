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

export { createPost };
