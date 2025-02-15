import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { User } from "../Schema/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const userRoute = Router();

const userSchema = z.object({
  username: z.string().min(3, { message: "Name should be minimum 3 letter" }),
  password: z
    .string()
    .min(6, { message: "Password should be minium 6-letters" }),
});

type UserType = z.infer<typeof userSchema>;

//1.zod- validation
//2. hash-pass
//3. store in db
userRoute.post("/signup", async (req: Request, res: Response) => {
  try {
    const { success, data, error } = await userSchema.safeParse(req.body);
    const { username, password }: UserType = req.body; //this is infered from the 'zod schema above'

    if (!success) {
      res.status(403).json({
        error: error.message,
      });
      return;
    }

    //zod inp validation
    const existingUser = await User.findOne({
      username: username,
    });

    if (existingUser) {
      res.status(403).json({
        message: "user already exists!",
      });
      return;
    }

    const hashedPass = await bcrypt.hash(password, 10);

    console.log("The hashed pass is :" + hashedPass);

    await User.create({
      username: username,
      password: hashedPass,
    });

    res.status(200).json({
      message: "User created successfully!",
    });

    return;
  } catch (error) {
    console.log("Error in signup - functionality :" + error);

    res.json({
      status: 500,
      message: "Interval server error in signup functionality!",
    });
    return;
  }
});

userRoute.post("/signin", async (req, res) => {
  try {
    const { username, password }: UserType = req.body;

    const existingUser = await User.findOne({
      username: username,
    });

    if (!existingUser) {
      res.status(403).json({ message: "User does not exist!" });
      return;
    }

    const decodedPass = await bcrypt.compare(password, existingUser?.password);

    if (!decodedPass) {
      res.status(411).json({ message: "Invalid credentials" });
      return;
    }

    const jwt_key = process.env.JWT_SECRET_KEY;

    if (!jwt_key) {
      res.status(500).json({ message: "JWT secret key is not provided" });
      return;
    }
    const token = jwt.sign({ id: existingUser._id }, jwt_key);

    res.status(200).json({
      message: "Token created successfully!",
      token: token,
    });

    return;
  } catch (error) {
    console.log(`Error in signin functionality : ${error}`);
    res.status(500).json({
      message: "Internal server error in sign-in functionality",
      error: error,
    });
  }
});
export default userRoute;
