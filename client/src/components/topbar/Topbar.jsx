import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const PF = "http://localhost:8000/images/"
  // const user = false;
  const {user,dispatch} = useContext(Context)

  const handleLogout =()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/" >
            {user && "HOME"}
            </Link>
          </li>
          <li className="topListItem">{user && "ABOUT"}</li>
          <li className="topListItem">{user && "CONTACT"}</li>
          <li className="topListItem">
            <Link className="link" to="/write" >
            {user && "WRITE"}
            </Link>
          </li>
          {<li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={PF+user.profilePic}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login" >
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register" >
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}