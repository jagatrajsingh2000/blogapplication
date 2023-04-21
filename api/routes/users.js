import  express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js"
import bcrypt from "bcrypt"
const router = express.Router();

//update user
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                { new:true }
            );
            res.status(200).json(updatedUser)
            
            
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json("you can update only your account")
    }
})


//delete user

router.delete('/:id',async(req,res)=>{
    if(req.body.userId===req.params.id){
        try {
            //finding the Id to peform delete action on all post and deleting account
            const user = await User.findById(req.params.id);
            try {
                //deleting all post from db Post
                await Post.deleteMany({usename:user.username})
                //deleteing account from db User
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted")

            } catch (error) {
                res.status(500).json(err);
                
            }
        } catch (error) {
            res.status(404).json("user name not found")
        }
    }
    else{
        res.status(401).json("you can delete only your account!")
    }
})

//getting a single user
router.get('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password,...other} = user._doc;
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
        
    }
})
export default router;