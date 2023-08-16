import React, { useContext, useState } from "react";
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
  const {currentuser, active, dataDispatch} = useContext(DataContext)
  
 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleHome = (value)=>{
    dataDispatch({
      type: "addActive",
      payload:value
    })
    navigate("/");
  }
  const handleBookmark = (value)=>{
    dataDispatch({
      type: "addActive",
      payload:value
    })
    navigate('/bookmark');
  }
  const handleExplore = (value)=>{
    dataDispatch({
      type: "addActive",
      payload:value
    })
    navigate("/explore");
  }

  const handleProfile = (value)=>{
    dataDispatch({
      type: "addActive",
      payload:value
    })
    navigate("/profile");
  }

  return (
    <div className="explore-section">
      <div className="explore-main">
        <div className="home-icon" onClick={()=>handleHome("home")}>
          <span>
            <AiOutlineHome />{" "}
          </span>{" "}
          <span style={{ fontWeight: active === "home" ? "600" : "400" }}>
            {" "}
            Home{" "}
          </span>
        </div>
        <div className="explore" onClick={()=>handleExplore("explore")}>
          <span>
            <BsRocketFill />
          </span>
          <span style={{ fontWeight: active === "explore" ? "600" : "400" }}>
            Explore
          </span>
        </div>
        <div className="bookmark" onClick={()=>handleBookmark("bookmark") }>
          <span>
            <BsBookmarkHeartFill />
          </span>{" "}
          <span style={{ fontWeight: active === "bookmark" ? "600" : "400" }}>
            Bookmark
          </span>
        </div>

        {/* <div className="profile" onClick={() => handleProfile("profile")}>
          <span>
            <FaUserAlt />
          </span>{" "}
          <span style={{ fontWeight: active === "profile" ? "600" : "400" }}>
            Profile
          </span>
        </div> */}


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
