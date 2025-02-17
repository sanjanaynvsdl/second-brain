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

const allowedOrigins = ["http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors());

app.get("/", (req,res)=> {
    res.send("heyy, Lessgoo")
});

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/share", shareRoutes);



async function connectDB() {
    const mongoose_uri = process.env.MONGOOSE_URI;
    if(!mongoose_uri) {
        throw new Error(`Please provide the connection string!`)
    }
    mongoose.connect(mongoose_uri)
    .then(()=> {
        console.log("Successfully connected to DB");
        app.listen(3000, ()=> {
            console.log('Server is listening to the port 3000')
        })
    })
    .catch((err)=> {
        console.log(err);
    })
}

connectDB();











