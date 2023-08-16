import React from "react";
import {BsSearch} from "react-icons/bs";
import { useContext } from "react";
import SuggestionCard from "./components/SuggestionCard";
import { DataContext } from "../../../context/DataContext";
import "./rightDiv.scss";

const RightDiv = () => {
  const {allUsers, currentuser, searchUser, dataDispatch} = useContext(DataContext);

  const handleUserSearch = (value) => {
    console.log("searchUser", searchUser);
    dataDispatch({
      type:"searchUser",
      payload: value,
    })
  }

  const filteredUsers = allUsers?.filter((user)=> user.firstName.toLowerCase().includes(searchUser.toLowerCase()) || user.lastName.toLowerCase().includes(searchUser.toLowerCase()))

  return (
    <div className="suggestions-section">
      <div className="search-section">
        <span>
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search Posts, People, Anything..."
          onChange={(e) => handleUserSearch(e.target.value)} 
        />
      </div>
      <div className="who_follow">
        <p>Who to Follow?</p>
        <p className="show_more">Show More</p>
      </div>
      <div className="suggestion_main">
      {filteredUsers?.filter((user)=>user.username!==currentuser.username)?.
          filter((user)=>!allUsers?.find((curr)=>curr.username===currentuser.username)?.following?.map((usr)=>usr.username)?.includes(user.username))?.map((user)=><SuggestionCard user={user} key={user._id}/>)}
      </div>
    </div>
  );
};

export default RightDiv;
