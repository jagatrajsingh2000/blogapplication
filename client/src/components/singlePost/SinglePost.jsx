import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import Comments from "../comments/Comments";
import "./singlePost.css";

export default function SinglePost() {
  const url = 'http://localhost:8000/api'
  //use location use
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [post, setPost] = useState({})
  //state declaration of update feature
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false)

 
  //for photo to be displayed
  const PF = "http://localhost:8000/images/"

  //initializing usecontext so we can use user
  const { user } = useContext(Context)
  
  //like functionality
  const [likes, setLikes] = useState([]);
  const [isClicked, setIsClicked] = useState();

  // const handleClick = () => {
  //   if (isClicked) {
  //     setLikes(likes - 1);
  //   } else {
  //     setLikes(likes + 1);
  //   }
  //   setIsClicked(!isClicked);
  // };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${url}/posts/` + path)
      // console.log(res.data)
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLikes(res.data.likes);
      console.log(res.data.likes.length)
      for(let x in res.data.likes){
        if(res.data.likes[x]===user._id){
          console.log(res.data.likes[x]===user._id)
          setIsClicked(true)
          console.log("true")
        }
        else{
          console.log("false")
        }
      }
    }
    getData()
  }, [path,isClicked]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/posts/${post._id}`, { data: { username: user.username } })
      window.location.replace('/')
    } catch (error) {

    }
  }
  const handleUpdate = async () => {
    try {
      await axios.put(`${url}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
      //what we did here is that in order to not to use wideow.location abs
      //we used the state in which we have edited on singlepost display 
      //insted of post.title the we have get from the abs api

      // window.location.replace('/post/'+post._id)

    } catch (error) {

    }
  }
  const handleLike = async() =>{
    try {
      await axios.put(`${url}/posts/like`,{
        postId:post._id,
        userId:user._id
      })
      setIsClicked(true)
    } catch (error) {
      console.log("error while liking")
      
    }
  }
  const handleUnlike = async() =>{
    try {
      await axios.put(`${url}/posts/unlike`,{
        postId:post._id,
        userId:user._id
      })
      setIsClicked(false)
    } catch (error) {
      console.log("error while liking")
      
    }
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {
          post.photo && <img
            className="singlePostImg"
            src={PF + post.photo}
            alt=""
          />
        }
        {
          updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (<h1 className="singlePostTitle">
            {title}
            {post.username === user?.username &&
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>

            }
          </h1>)

        }   
         <h1 className="singlePostTitle">
          <div className="singlePostEdit">
            {isClicked?<i className=" singlePostIconEdit fas fa-heart" onClick={handleUnlike}></i>:<i className=" singlePostIconEdit far fa-heart" onClick={handleLike}></i>}
            {/* <i className=" fas fa-heart" onClick={handleUnlike}></i>
            <i className=" singlePostIcon far fa-heart" onClick={handleLike}></i> */}
            <br/>
            <p>{likes.length} likes</p>
           
          </div>
        </h1>


        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">

              <Link className="link" to={`/?username=${post.username}`}>{post.username}</Link>

            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        {/* <label htmlFor="comment"></label>
        <textarea name="" id="comment" cols="30" rows="3"></textarea> */}
    

        <br />
       
        <Comments post={post}/>
    
      </div>
    </div>
  );
}
