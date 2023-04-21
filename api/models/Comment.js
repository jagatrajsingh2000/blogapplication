import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    commentUsername:{
        type:String,
        required:true
    },
    postId:{
        type: String,
        required:true
    },
    userId:{
        type :String,
        required:true
    },
    comments:{
        type:String,
        required:true
    },
    postUsername:{
        type:String,
        required:true
    }
},{timestamps:true})

const comment = mongoose.model('comment',CommentSchema);
export default comment;