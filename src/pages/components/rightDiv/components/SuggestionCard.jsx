import React,{useContext} from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./suggestionCard.scss";
import axios from "axios";
import { DataContext } from "../../../../context/DataContext";
import {toast} from "react-toastify";
const SuggestionCard = ({ user }) => {
  const navigate = useNavigate();
  const {dataDispatch} = useContext(DataContext);

  const { _id, profile_pic, firstName, lastName, username } = user;

  const token = (localStorage.getItem('encodedToken'));

  const handleFollow = async (userId, token) => {
      try{
        const {data:{user, followUser}, status} = await axios.post(`/api/users/follow/${userId}`, {}, {headers: {authorization:token}})
        dataDispatch({
          type:"update_follow_user",
          payload: {user, followUser}
        })
        toast.success("user followed");      
      }
      catch(err){
        console.error(err);
      }
  }

  return (
    <div className="suggestion_card" key={_id}>
      <div className="suggestion_image_name" onClick={() => navigate(`/user/${user?.username}`)}>
        <div className="profile_pic">
          <img src={profile_pic} alt="profile" />
        </div>
        <div className="username">
          <p className="name">
            {firstName} {lastName}
          </p>
          <p className="user">@{username}</p>
        </div>
      </div>
      <div className="follow_btn" onClick={()=>handleFollow(user._id, token)}>
        <p>
          Follow{" "}
          <span>
            <AiOutlinePlus />
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default SuggestionCard;
