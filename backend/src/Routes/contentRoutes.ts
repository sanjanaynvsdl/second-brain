import {Router, Request, Response} from 'express';
import { userMiddleware } from '../middleware';
import { Content } from '../Schema/db';
import {z} from 'zod';
import mongoose from 'mongoose'

const route = Router();


const contentSchema = z.object({
    title:z.string(),
    link:z.string(),
    type:z.string(),
})

type contentType = z.infer<typeof contentSchema>


//Add a content
route.post("/", userMiddleware,  async(req:Request,res:Response)=> {

    try {
        const {title,link, type}:contentType = req.body;
        const {success, data, error}= await contentSchema.safeParse(req.body);

        if(!success) {
            res.status(411).json({
                message:error.errors.map((err)=> err.message).join(", ")
            });
            return;
        }

        await Content.create({
            title:title,
            link:link,
            type:type,
            tags:[],
            userId:req.userId
        });

        res.status(200).json({
            message:"Content created successfully!"
        })
        return;

    } catch (error) {
        console.log(`Error in post content functionality : ${error}`);
        res.status(500).json({
            message:"Internal server error in post content functionality",
            error:error
        })
    }
});

route.get("/", userMiddleware, async(req:Request, res:Response)=> {
    try {

        //If-content ka user details are needed we use populate
        //If we need to only certain properties
        //.populate("userId","username password");

        const contents = await Content.find({
            userId:req.userId
        }).populate("userId", 'username password');
        

    
        res.status(200).json({
            message:"Fetched all user content!",
            content:contents
        })
        return;
        
    } catch (error) {
        console.log(`Error in get-user-content functionality : ${error}`);
        res.status(500).json({
            message:"Error in get-all user content functionality!",
            error:error
        })
        return;
    }
})



//Delete a content
route.delete("/:id", userMiddleware, async(req:Request,res: Response)=> {
    try {
        const contentToDel = req.params.id;
        const item = await Content.findOne({
            _id:contentToDel
        });

        if(!item) {
            res.status(403).json({message:"Content does not exist!"});
            return;
        }

        console.log(`The id's are : ${item.userId} and req is from ${req.userId}`);
        
       if(!(new mongoose.Types.ObjectId(req.userId as string).equals(item.userId))) {
        res.status(403).json({message:"Not authorized to delete the content!"});
        return;
       }

        await Content.deleteOne({
            _id:contentToDel
        })

        res.status(200).json({
            message:"Successfully deleted the content!"
        })
        
    } catch (error) {
        console.log(`Error in delete content functionality : ${error}`);
        res.status(500).json({
            message:`Error in delete content functionality!`,
            error:error
        })
        return;
    }
    

})


//Update a content
route.put("/:id", (req,res)=> {

})





export default route;