import {Router} from 'express';

const route = Router();


//Add a content
route.post("/", (req,res)=> {

})


//Get-all contents
route.get("/", (req,res)=> {
    res.send("content routes are working")

})


//Delete a content
route.delete("/:id", (req,res)=> {

})


//Update a content
route.put("/:id", (req,res)=> {

})





export default route;