import { Router } from "express";

const route=Router();

route.get("/", (req,res)=> {
    res.send("link share routes are working!");
})


//create a link to share post
route.post("/", (req,res)=> {

})

//get the link to share brain
route.get("/:shareId", (req,res)=> {

})

export default route;