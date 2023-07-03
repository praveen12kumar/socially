import React, { useContext, useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsRocketFill,
  BsBookmarkHeartFill,
} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { randomProfilePic } from "../../../resources/randomImages/RandomImages";
import "./leftDiv.scss";


const LeftDiv = () => {
  const { logout, currentUser, setCurrentUser } = useContext(AuthContext);
  const [active, setActive] = useState("home");
 
  
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };


  useEffect(()=>{
    setCurrentUser(JSON.parse(localStorage.getItem('userData')))
  },[])

  return (
    <div className="explore-section">
      <div className="explore-main">
        <div className="home-icon" onClick={() => setActive("home")}>
          <span>
            <AiOutlineHome />{" "}
          </span>{" "}
          <span style={{ fontWeight: active === "home" ? "600" : "400" }}>
            {" "}
            Home{" "}
          </span>
        </div>
        <div className="explore" onClick={() => setActive("explore")}>
          <span>
            <BsRocketFill />
          </span>
          <span style={{ fontWeight: active === "explore" ? "600" : "400" }}>
            Explore
          </span>
        </div>
        <div className="bookmark" onClick={() => setActive("bookmark")}>
          <span>
            <BsBookmarkHeartFill />
          </span>{" "}
          <span style={{ fontWeight: active === "bookmark" ? "600" : "400" }}>
            Bookmark
          </span>
        </div>
        <div className="profile" onClick={() => setActive("profile")}>
          <span>
            <FaUserAlt />
          </span>{" "}
          <span style={{ fontWeight: active === "profile" ? "600" : "400" }}>
            {" "}
            Profile
          </span>
        </div>
        <div className="create-post">
          <button className="btn">Create New Post</button>
        </div>
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="bottom-profile" onClick={()=> navigate('/profile')}>
          <div className="profile-img">
            <img src={currentUser.profile_pic ? currentUser.profile_pic : randomProfilePic } alt="profile" />
          </div>
          <div className="user-name-email">
            <p className="user-name">{currentUser.firstName} {currentUser.lastName}</p>
            <p className="user-username">@{currentUser.username}</p>
          </div>
      </div>
    </div>
  );
};

export default LeftDiv;
