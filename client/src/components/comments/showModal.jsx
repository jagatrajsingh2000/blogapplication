import { useEffect,useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";


const ShowModal = ({ closeModal,comment }) => {
    
    const [title, setTitle] = useState()
    const url = 'http://localhost:8000/api'
    const {user} =useContext(Context)
  
    const [add,setAdd]=useState([])
    useEffect(() => {
        setTitle(comment.comments)
        
        document.body.style.overflowY = "hidden"
        return () => { document.body.style.overflowY = "scroll" }

    }, []);

    
    const Edit = async(index) => {
        console.log(title)
        console.log(comment,user.username)
        const response = await axios.put(`${url}/comments/edit`,{
            currentUsername:user.username,
            commentUsername:comment.commentUsername,
            commentId:comment._id,
            comments:title
        })
        closeModal()
        

    }
  
    
    return (
        <>


            {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Launch demo modal
                    </button>
      
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
                <div className="mb-3">
                    <label htmlFor="examplehtmlformControlInput1" className="form-label">comment</label>
                    <input type="text" className="form-control" id="examplehtmlformControlInput1" placeholder="Title" value={title} style={{width:"40px !important"}} onChange={(event) => { setTitle(event.target.value) }} />
                </div>
                <br />
                <button type="button" class="model-btn" onClick={closeModal}>close</button>
                <button type="button" class="model-btn" onClick={()=> Edit()}>Save</button>

            </div>





        </>
    )
        }
export default ShowModal