import { Request, Response } from "express";
import { User } from "../models/User";
import { UserSchema } from "../validators/userValidator";
// import { fromZodError } from "zod-validation-error";
// import bcrypt from "bcryptjs";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json({ users: users });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
//

// Controller function to register a new user
const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Create a new user
    const newUser = new User({
      username,
      password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json(error); // Handle any validation or database errors
  }
};
// Controller function to log in an existing user
const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists and compare passwords
    if (user && user.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json(error); // Handle any errors
  }
};

export { getAllUser, registerUser, loginUser };
