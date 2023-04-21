import mongoose from "mongoose";

const  PostSchema = new mongoose.Schema({
    title:{
        type:String,
        reuired:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:false,
    },
    likes:{
        type:Array,
        required:false,
        // unique:true,
    }
    
},{timestamps:true})

const Post = mongoose.model("Post",PostSchema);
export default Post;