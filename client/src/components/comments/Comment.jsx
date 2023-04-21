import { useContext, useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material";
import { Context } from "../../context/Context";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './style.css'
import ShowModal from './showModal'


const Comment = ({ comment, setToggle }) => {
    const [showModal,setShowModal]=useState(false)
    const closeModal = () => {setShowModal(false)
    setToggle(false)}
    const url = 'http://localhost:8000/api'
    // const [commentId,setCommentId]=useState()
    console.log()
    const { user } = useContext(Context);
    console.log(user)
    useEffect(()=>{

    })
    const removeComment = async () => {
        console.log(comment)
        console.log(user.username)
        let response = await axios.delete(`${url}/comments/delete`, {data:{
            postUsername: comment.postUsername,
            commentUsername: comment.commentUsername,
            currentUsername: user.username,
            commentId: comment._id
        }});
        if (response) {
            setToggle(prevState => !prevState)
        }
    }

    // const editComment = async() =>{
    //     let response = await axios.put()
    // }
    return (
        <>
            <h3 style={{marginRight:900}}>{comment.commentUsername}</h3>
            <div className='eachItem' key={comment._id}>

                <p>{comment.comments}</p>
                <div className='todo-btn'>
                    {comment.commentUsername === user.username ?
                        <><i className='far fa-edit add-btn' onClick={()=>setShowModal(true)}  ></i>
                            <i className='far fa-trash-alt add-btn' onClick={()=>removeComment()} ></i></> : <></>}
                    {/* {comment.postUsername===user.username  <>
            <i className='far fa-trash-alt add-btn' ></i></>:<></>} */}


                </div>
            </div>
            {showModal && <ShowModal closeModal={closeModal} comment={comment} />}
        </>
    )
}

export default Comment
