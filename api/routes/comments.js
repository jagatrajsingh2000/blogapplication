import express, { request } from "express";
import Comment from "../models/Comment.js";
const router = express.Router();

router.post('/create',async(request,response)=> {
    try {
        let comment=await new Comment(request.body)
        comment.save();

        response.status(200).json({msg:'Comment saved successfully'})
    } catch (error) {
        response.status(500).json({error:error.messages})
    }
})

router.delete("/delete",async(req,res)=>{
    try {
        if(req.body.postUsername===req.body.commentUsername){
            await Comment.findByIdAndDelete({_id:req.body.commentId})
        }
        else if(req.body.currentUsername===req.body.commentUsername){
            await Comment.findByIdAndDelete({_id:req.body.commentId})
        }
        res.status(200).json({msg:'Comment deleted'})
    } catch (error) {
        res.status(500).json({error:error.messages})
        
    }
})

router.get('/getcomments/:id',async(req,res)=>{

    // const postId = req.params.id
    try {
        const result = await Comment.find({postId:req.params.id})
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({error:error.messages})
    }
})

router.put("/edit",async(req,res)=>{
    try {
        if(req.body.currentUsername===req.body.commentUsername){
            await Comment.findByIdAndUpdate({_id:req.body.commentId},{$set:{comments:req.body.comments}})
        }
        return res.status(200).json({msg:'successfull'})
    } catch (error) {
        return res.status(500).json({mes:error.message},"error caught")
    }
})


export default router;