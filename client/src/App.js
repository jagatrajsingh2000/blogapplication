import Topbar from "./components/topbar/Topbar";
import Home from "./pages/homepage/Home";
import Login from "./pages/login/Logni";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {
 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import ScrollToTop from "./ScrollToTop";



function App() {
  const { user } = useContext(Context)
  return (
    <Router>
      <ScrollToTop/>
      <Topbar/>
      <Routes>
      <Route path='/' element={user?<Home/>:<Register/>}/>
      <Route path='/register' element={user?<Home/>:<Register/>}/>
      <Route path='/write' element={user?<Write/>:<Register/>}/>
      <Route path='/login' element={user?<Home/>:<Login/>}/>
      <Route path='/settings' element={user?<Settings/>:<Register/>}/>
      <Route path='/post/:postId' element={user?<Single/>:<Register/>}/>

      </Routes>






      {/* <Single/> */}
      {/* <Home/> */}
      {/* <Write/> */}
      {/* <Settings/> */}\
      {/* <Login/> */}
      {/* <Register/> */}
    </Router>
  );
}

export default App;
