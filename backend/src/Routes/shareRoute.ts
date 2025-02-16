import { Router } from "express";
import { userMiddleware } from "../middleware";
import { Content, SharableLink, User } from "../Schema/db";
import { Request, Response } from "express";
import { randomString } from "../utils";
import { hash } from "bcrypt";

const route = Router();

//create a link to share post
route.post("/", userMiddleware, async (req: Request, res: Response) => {
  try {
    const share = req.body.share;

    if (share) {

      const existingUser = await SharableLink.findOne({
        userId: req.userId,
      });

      if (existingUser) {
        res.status(200).json({
          message: "Retrived the link from the DB",
          hash: existingUser.hash,
        });
        return;
      }

      const hash = randomString(10);
      await SharableLink.create({
        hash: hash,
        userId: req.userId,
      });
      res.status(200).json({
        message: "Successfully created hash and stored!",
        hash:hash,
      });
      return;
    }

    await SharableLink.deleteOne({
      userId: req.userId,
    });

    res.status(200).json({ message: "Successfully deleted the link!" });
    return;
  } catch (error) {
    console.log(`Error in create sharable-link functionality! ${error}`);
    res.status(500).json({
      message: "Internal server error in create sharable-link functionality!",
    });
    return;
  }
});

//get the link to share brain
route.get("/:hash", async (req: Request, res: Response) => {
  try {
    const hashParam = req.params.hash;
    if (hashParam == "") {
      res.status(411).json({ message: "Invalid link" });
      return;
    }

    const user = await SharableLink.findOne({
      hash: hashParam,
    });

    if (!user) {
      res.status(411).json({ message: "No valid link!" });
      return;
    }

    // console.log(user);

    const userContents = await Content.find({
      userId: user.userId,
    });

    const userInfo = await User.findOne({
      _id: user.userId,
    });

    res.status(200).json({
      user: userInfo?.username,
      contents: userContents,
      message: "Successfully fetched user contents!",
    });
    return;
  } catch (error) {
    console.log(`Error in get sharable-link functionality ${error}`);
    res.status(500).json({
      message: "Error in get sharable link functionality!",
      error: error,
    });
  }
});

export default route;
