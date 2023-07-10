import {Routes, Route, Navigate} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RequiresAuth } from "./requiresAuth/RequiresAuth";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/register/Signup";
import HomeLayout from "./pages/layout/homeLayout/HomeLayout";
import Profile from "./pages/profile/Profile";
import IndividualUser from "./pages/individualUser/IndividualUser";
import Bookmark from "./pages/bookmarks/Bookmark";
import Explore from "./pages/explore/Explore";

import './App.css';
import { AuthContext } from "./context/AuthContext";

function App() {
  const {isLoggedIn} = useContext(AuthContext);
  const location = useLocation();
  return (
    <div>
      <ToastContainer 
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
     />

     
      <Routes>
        <Route path="/" element={<RequiresAuth><HomeLayout/></RequiresAuth>}/>
        <Route path="/login" element={
          isLoggedIn ? (location?.state !== null ?(<Navigate to={location?.state?.from?.pathname} />)
          :<Navigate to="/" />): <Login/>
        }/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/profile/" element={<Profile/>}/>
        <Route path="/user/:username" element={<IndividualUser/>}/>
        <Route path="/bookmark" element={<Bookmark/>}/>
        <Route path="/explore" element={<Explore/>}/>
      </Routes>
    </div>
  );
}

export default App;
