import React from 'react'
import {AiOutlinePlus} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import "./suggestionCard.scss";

const SuggestionCard = ({user}) => {
  const navigate = useNavigate();
  const {_id, profile_pic, firstName, lastName, username} = user
  return (
    <div className='suggestion_card' key={_id} onClick={()=> navigate(`/user/${user?.username}`)}>
      <div className="profile_pic">
        <img src={profile_pic} alt="profile" />
      </div>
      <div className="username">
        <p className='name'>{firstName} {lastName}</p>
        <p className='user'>@{username}</p>
      </div>
      <div className="follow_btn">
        <p>Follow <span><AiOutlinePlus/></span> </p>
      </div>
    </div>
  )
}

export default SuggestionCard

