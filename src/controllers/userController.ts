import { Request, Response } from "express";
import { User } from "../models/User";
import { UserSchema } from "../validators/userValidator";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";

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

const registerUser = async (req: Request, res: Response) => {
  try {
    //
    console.log(req.body, "req.body of registerUser");
    //
    const { username, password } = req.body;
    //

    //
    const validatedTask = UserSchema.safeParse({
      username: username,
      password: password,
    });
    //
    if (!validatedTask.success) {
      //zod messa in a string showing
      return res
        .status(400)
        .json({ error: fromZodError(validatedTask.error).message });
    }
    //
    const validatedData = validatedTask.data;
    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);
    //
    const user = new User({
      username: validatedData.username,
      password: hashedPassword,
    });
    await user.save();

    res.json({ user: user, message: "user created" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//
const loginUser = async (req: Request, res: Response) => {
  //
  console.log(req.body, "req.body of loginUser");
  //
  try {
    const { username, password } = req.body;
    // need to be findOne(find giving error )
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ messsage: "user not found" });
    }

    console.log(user.password, "user");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ user: user, message: "login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export { getAllUser, registerUser, loginUser };
