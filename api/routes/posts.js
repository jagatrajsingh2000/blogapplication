import express from "express";

import Post from "../models/Post.js";
const router = express.Router();

//for like
router.put("/like",async(req,res)=>{
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId,{$addToSet:{likes:req.body.userId}},{new:true})
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json(error)   
        
    }})
    
    router.put("/unlike",async(req,res)=>{
        try {
            const result = await Post.findByIdAndUpdate(req.body.postId,{$pull:{likes:req.body.userId}},{new:true})
            res.status(200).json(result)
        } catch (error) {
            res.status(404).json(error)   
            
        }})
    

//creating post
router.post("/",async(req,res)=>{
    const newPost = await Post(req.body);
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)  
    }
})

//updating post
router.put("/:id",async(req,res)=>{
    
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    {new:true}
                )
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
                
            }    
        }
    } catch (error) {
        res.status(404).json(error)        
    }
})

//delete methood
router.delete("/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        console.log(post)
        if(post.username === req.body.username){
            try {
                await post.deleteOne()
                res.status(200).json("post deleted")
            } catch (error) {
                res.status(500).json("error") 
            }
        }
        else{
            res.status(500).json("you can only delete your own post")
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

//get Post

router.get('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
        
    }

})

//get all posts

router.get('/',async(req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try {
        let posts
        if(username){
            //particular user post
            posts = await Post.find({username:username})
        }else if(catName){
            //perticular category post
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            // all post
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// router.put('/',async(req,res)=>{
//     const username = req.query.user;

//     try {
//         const updatedUsernamePost = await Post.findAndUpdate({username:username},{$set: req.body});
//         res.status(200).json(updatedUsernamePost)
//     } catch (error) {
        
//     }
// })

router.put("/",async(req,res)=>{
    const username = req.body.usernamebeforeedit
    try {
        const post = await Post.updateMany({username:username},{$set:{"username":req.body.username}});
        res.status(200).json(post)   
        }
    catch (error) {
        res.status(404).json(error)        
    }
})



export default router;