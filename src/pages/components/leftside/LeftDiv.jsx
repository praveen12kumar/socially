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
import { DataContext } from "../../../context/DataContext";


const LeftDiv = () => {
  const { logout } = useContext(AuthContext);
  const {currentuser} = useContext(DataContext)
  const [active, setActive] = useState("home");
 
  
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };


  const handleHome = ()=>{
    setActive("Home");
    navigate("/");
  }
  const handleBookmark = ()=>{
    setActive("bookmark");
    navigate('/bookmark');
  }
  const handleExplore = ()=>{
    navigate("/explore");
    setActive("explore");
 
}



  return (
    <div className="explore-section">
      <div className="explore-main">
        <div className="home-icon" onClick={handleHome}>
          <span>
            <AiOutlineHome />{" "}
          </span>{" "}
          <span style={{ fontWeight: active === "home" ? "600" : "400" }}>
            {" "}
            Home{" "}
          </span>
        </div>
        <div className="explore" onClick={handleExplore}>
          <span>
            <BsRocketFill />
          </span>
          <span style={{ fontWeight: active === "explore" ? "600" : "400" }}>
            Explore
          </span>
        </div>
        <div className="bookmark" onClick={handleBookmark }>
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
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="bottom-profile" onClick={()=> navigate('/profile')}>
          <div className="profile-img">
            <img src={currentuser?.profile_pic ? currentuser?.profile_pic : randomProfilePic } alt="profile" />
          </div>
          <div className="user-name-email">
            <p className="user-name">{currentuser?.firstName} {currentuser?.lastName}</p>
            <p className="user-username">@{currentuser?.username}</p>
          </div>
      </div>
    </div>
  );
};

export default LeftDiv;
