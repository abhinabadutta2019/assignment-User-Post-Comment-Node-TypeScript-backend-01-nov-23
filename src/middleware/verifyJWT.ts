import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";

//
interface CustomRequest extends Request {
  //as no question mark - was the reason of error
  user?: any; // Replace 'any' with the actual user data type
}

//

const verifyJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: "no token found" });
    }
    //
    console.log(
      req.headers.authorization,
      "req.headers.authorization from verifyJWT"
    );

    //
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];
    //

    const result = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    // console.log(result, "result");
    const userID = result._id;

    //sending the user._id in the routes
    req.user = await User.findOne({ _id: userID }).select("_id");
    // req.user = await User.findOne({ _id: userID });
    // console.log(req.user, "user");

    // console.log(_id, "_id");
    next();
    //
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export { verifyJWT };
