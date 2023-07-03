import React, {useState} from "react";
import {BsSearch} from "react-icons/bs";
import { useContext } from "react";
import SuggestionCard from "./components/SuggestionCard";
import { DataContext } from "../../../context/DataContext";
import "./rightDiv.scss";

const RightDiv = () => {
  const {allUsers} = useContext(DataContext);
  const userData = JSON.parse( localStorage.getItem("userData"));
  
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
        {allUsers.filter((item)=>item.username !== userData.username).map((user) => (
          <SuggestionCard user={user}  key={user.id}/>
        ))}
      </div>
    </div>
  );
};

export default RightDiv;
