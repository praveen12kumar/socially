import React, { useState, useContext } from "react";
import "./createPost.scss";
import ModalComponent from "../modal/ModalComponent";
import {AiOutlinePlusCircle} from "react-icons/ai";
import { DataContext } from "../../../context/DataContext";
import { randomProfilePic } from "../../../resources/randomImages/RandomImages";


const CreatePost = () => {
  
  const [postInput, setPostInput] = useState({
    content:"",
    pic:"",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const {currentuser} = useContext(DataContext)
  
  
  return (
    <div className="create-post-container">
      <div className="post-profile-container">
        <div className="profile-img">
          <img src={currentuser?.profile_pic ? currentuser?.profile_pic : randomProfilePic } alt="profile" />
        </div>
      </div>
      <div className="create-post-section">
        <div className="create-post">
          <button className="post-status-btn" onClick={()=> setModalOpen(true)}>Write something interesting...</button>
          <span className="plus-btn"><AiOutlinePlusCircle/></span>
          <div className="modal">
            <ModalComponent
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              postInput={postInput}
              setPostInput={setPostInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
