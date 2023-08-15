import React, {useState} from "react";
import {BsSearch} from "react-icons/bs";
import { useContext } from "react";
import SuggestionCard from "./components/SuggestionCard";
import { DataContext } from "../../../context/DataContext";
import "./rightDiv.scss";

const RightDiv = () => {
  const {allUsers, currentuser} = useContext(DataContext);
  
  
  
  
  const [searched, setSearched] = useState("");
  return (
    <div className="suggestions-section">
      <div className="search-section">
        <span>
          <BsSearch />
        </span>
        <input
          type="text"
          placeholder="Search Posts, People, Anything..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
      </div>
      <div className="who_follow">
        <p>Who to Follow?</p>
        <p className="show_more">Show More</p>
      </div>
      <div className="suggestion_main">
      {allUsers?.filter((user)=>user.username!==currentuser.username)?.
          filter((user)=>!allUsers?.find((curr)=>curr.username===currentuser.username)?.following?.map((usr)=>usr.username)?.includes(user.username))?.map((user)=><SuggestionCard user={user} key={user._id}/>)}
      </div>
    </div>
  );
};

export default RightDiv;
