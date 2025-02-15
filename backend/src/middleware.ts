import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";


//Extending the existing request interface, or over-riding and adding 
declare module 'express' {
    interface Request{
        userId?:string | Object;
    }
}

export const userMiddleware = (req: Request,res: Response,next: NextFunction):void => {
    try {
        const token = req.headers.token as string; //this is how I send from postman
        const secret_key = process.env.JWT_SECRET_KEY;

        if(!token || !secret_key) {
            res.status(403).json({message:"Not Authorized!"})
            return;
        }

       const decodedData = jwt.verify(token, secret_key);

       if(decodedData && typeof decodedData=='object') {
            req.userId = decodedData.id;
            next();
       } else {
            res.status(500).json({
                message:"Issues while verifying data",
            })
       }

    } catch (error) {
        console.log(`Error in user middleware ${error}`);
        res.status(500).json({
            message:"Internal server error in user middleware ",
            error:error
        })
        return;
    }
}