import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRoute from './Routes/userRoutes';
import contentRoutes from "./Routes/contentRoutes";
import shareRoutes from "./Routes/shareRoute";
import cors from 'cors';

const app = express();
app.use(express.json());

const orginsAllowed = process.env.FRONTEND_URLS?.split(",");

const allowedCors:cors.CorsOptions ={
    origin: (origin, callback)=>{

        //1. Allow for same origin, server req's
        if(!origin) {
            return callback(null,true);
        } 

        //2. IN dev mode, allow all origin, or check allowedORgins array
        if(process.env.NODE_ENV=="development"|| orginsAllowed?.indexOf(origin)!==-1) {
            callback(null,true); 
        } else {
            callback(new Error("Not allowed by cors"))
        }

    },
    //3. Allow, cookies, methods, headers
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-type", "Authorization", "token"]
}

app.use(cors(allowedCors));

app.get("/", (req,res)=> {
    res.send("Lessgoo working!")
});

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/share", shareRoutes);

const port = process.env.PORT;

async function connectDB() {
    const mongoose_uri = process.env.MONGOOSE_URI;
    if(!mongoose_uri) {
        throw new Error(`Please provide the connection string!`)
    }
    mongoose.connect(mongoose_uri)
    .then(()=> {
        console.log("Successfully connected to DB");
        app.listen(port, ()=> {
            console.log('Server is listening to the port ' +port);
        })
    })
    .catch((err)=> {
        console.log(err);
    })
}

connectDB();











