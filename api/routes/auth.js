
import express from "express";
//models
import User from "../models/User.js"

import bcrypt from "bcrypt"
//initializing Router
const router = express.Router();


//REGISTER
router.post("/register",async(req,res)=>{
    try {
        const salt = await bcrypt.genSalbt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        })
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        const validated = await bcrypt.compare(req.body.password,user.password)
        if(!user){
            res.status(400).json("wrong credentials")

        }
        else if(!validated){

            res.status(400).json("wrong credentials")
        }
        
        

        

        //we dont need to send password so we send back erverything except pw
        const {password,...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})
export default router;