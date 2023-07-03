import React, { useState } from "react";
import "./createPost.scss";
import ModalComponent from "../modal/ModalComponent";

const CreatePost = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [post, setPost] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));
 

  return (
    <div className="create-post-container">
      <div className="post-profile-container">
        <div className="profile-img">
          <img src={userData.profile_pic} alt="profile" />
        </div>
      </div>
      <div className="create-post-section">
        <div className="create-post">
          <button className="post-status-btn" onClick={()=> setModalOpen(true)}>Write something interesting...</button>
          <div>
            <ModalComponent
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              post={post}
              setPost={setPost}
              //sendStatus={sendStatus}
            />
          </div>
        </div>
        <div className="emoji-post-container">
          <div className="image-emoji">
            <button>😊</button>
          </div>
          <div className="post-status">
            <button className="post-btn">POST</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
