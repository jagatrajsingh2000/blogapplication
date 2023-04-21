import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./sidebar.css";

export default function Sidebar() {
  const [cats,setCats] = useState([])
  const url='http://localhost:8000/api'
  useEffect(()=>{
    const getCats=async()=>{
      const res = await axios.get(`${url}/categories`)
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="image"
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          
            
              
            
            {
              cats.map((c)=>(
                <li className="sidebarListItem">
               <Link className="link" to={`/?cat=${c.name}`}> {c.name}</Link> </li>
              ))
            }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}