import { useState, useContext, useEffect } from "react";
import { Context } from '../../context/Context'
import Comment from "./Comment";
import axios from "axios";
import './style.css'

const initialValue = {
    commentUsername: '',
    postId: '',
    userId: '',
    comments: '',
    postUsername: '',
}

const Comments = ({ post }) => {

    const url1 = 'https://static.thenounproject.com/png/12017-200.png'
    const url = 'http://localhost:8000/api'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(true)
    const { user } = useContext(Context)

    useEffect(() => {
        const getData = async () => {
            const postId = post._id
            // console.log(postId)
            const response = await axios.get(`${url}/comments/getcomments/` + postId)
            if (response) {
                setComments(response.data);
                console.log(response.data)
            }
        }
        getData();
    }, [post, toggle])

    const handleChange = (e) => {
        setComment({
            ...comment,
            commentUsername: user.username,
            postId: post._id,
            comments: e.target.value,
            postUsername: post.username,
            userId: user._id
        })

    }


    const addComment = async (e) => {
        // if(commentToUpdate !== "") {
        //     // update comment
        //     alert("Call update")
        //     let findAndUpdate = await API.updateComment(commentToUpdate._id, commentToUpdate);
        // } else {
        // add comment
        let response = await axios.post(`${url}/comments/create`, comment);
        if (response.isSuccess) {
            setComment(initialValue)
        }
        setToggle(prevState => !prevState)



    }

    // function onEdit(currentComment){
    //     setCommentToUpdate(currentComment)
    //     document.getElementById('updateText').value = currentComment.comments
    //     console.log(currentComment);
    // }
    return (
        <>

            <div>
                <div>
                    <img src={url1} alt="dp" style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%'
                        
                    }} />
                    <input className="inputclass"
                        id="updateText"
                        minRows={5}
                        placeholder="what's on your mind?"
                        value={comment.comments}
                        onChange={(e) => handleChange(e)}
                    />
                    <button variant="contained" color="primary" size="medium" style={({ height: 55, width: 100, margin: 2 })}
                        onClick={(e) => addComment(e)}>post</button>

                </div>

            </div>

            <div className="showItems">
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} post={post} />
                    ))
                }

            </div>
        </>
    )
}

export default Comments
