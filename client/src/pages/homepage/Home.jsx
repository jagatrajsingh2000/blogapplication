import './home.css'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from "axios"
import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation()
 
  const url='http://localhost:8000/api'
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get(`${url}/posts`+search)
      // console.log(res.data)
      setPosts(res.data)
    }
    fetchPosts()
  },[search])
  return (
    <>
      <Header/>
      <Posts posts={posts}/>
      <Sidebar/>
    </>
  )
}

export default Home
