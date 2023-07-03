import React, { useState, useContext } from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineClose,
  AiFillHeart,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsBookmark, BsThreeDotsVertical, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./singlePost.scss";
import { randomProfilePic } from "../../../resources/randomImages/RandomImages";
import { DataContext } from "../../../context/DataContext";
import {toast} from "react-toastify";
import axios from "axios";

const SinglePost = ({ postData }) => {
  const token = (localStorage.getItem('encodedToken'));
  const navigate = useNavigate();
  const profileId = JSON.parse(localStorage.getItem("userData"))?._id;
  const [isThreDotsOpen, setIsThreDotsOpen] = useState(false);
  const [isEditPostModal, setIsEditPostModal] = useState(false);

  const {state, bookmarks, dataDispatch} = useContext(DataContext);

  const deleteClickHandler = () => {};
  
  const addBookmark = async(postId, token)=>{
    try{
      const {data:{bookmarks},status}= await axios.post(`/api/users/bookmark/${postId}`, {}, {headers:{authorization:token}});
        console.log("newly Added Bookmark", bookmarks);
        console.log("state at added bookmark", state);
        
        dataDispatch({
          type:"getNewBookmarks",
          payload:bookmarks,
        })
        toast.success("Added bookmark");
    }
    catch(err){
      console.error(err);
    }
  }

  const deleteBookmark = async (postId, token) => {
    try{
      const {data:{bookmarks},status} = await axios.post(`/api/users/remove-bookmark/${postId}`,{}, {headers:{authorization:token}})
      console.log("Bookmarks after deletion", bookmarks);
      toast.warn("Bookmark Removed");
      dataDispatch({
        type:"getNewBookmarks",
        payload:bookmarks
      })
    }
    catch(err){
      console.error(err);
    }
  };
 
  
  const checkBookmark =(postId, bookmarks)=>{
    return bookmarks.some((bokmark)=> bokmark._id === postId)
  }

  const handleBookmark = (postId, bookmarks, token)=>{
    checkBookmark(postId, bookmarks) ? deleteBookmark(postId,token) : addBookmark(postId,token) 
  }

  

  return (
    
    <div className="singlePost-container">
      
      <div className="singlePost-head">
        <div className="singlePost-postedBy">
          {" "}
          {/*navigate to postedId page*/}
          <div className="postedBy-profile">
            <img
              src={
                postData?.postedBy?.profile_pic
                  ? postData?.postedBy?.profile_pic
                  : randomProfilePic
              }
              alt="ProfilePic"
            />
          </div>
          <div className="singlePost-name-username-date">
            <p className="name">{`${postData?.postedBy?.firstName} ${postData?.postedBy?.lastName}`}</p>
            <p className="username">@{`${postData?.username}`}</p>
          </div>
          <p className="date">{new Date(postData?.createdAt).toDateString()}</p>
        </div>
        {postData?.postedBy?._id === profileId && (
          <div className="three-dots-container">
            {isThreDotsOpen ? (
              <button
                className="dots-icons"
                style={{ color: "red" }}
                onClick={() =>
                  isThreDotsOpen
                    ? setIsThreDotsOpen(false)
                    : setIsThreDotsOpen(true)
                }
              >
                <AiOutlineClose />
              </button>
            ) : (
              <button
                className="dots-icons"
                onClick={() => setIsThreDotsOpen(true)}
              >
                <BsThreeDotsVertical />
              </button>
            )}
            {isThreDotsOpen && (
              <div className="threeDotsMenu">
                <p className="option1" onClick={() => setIsEditPostModal(true)}>
                  Edit
                </p>
                <p className="option2" onClick={() => deleteClickHandler}>
                  Delete
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="singlePost-body">
        <div className="content-pic">
          <p className="singlePost-content">{postData?.content}</p>
          {postData?.pic && (
            <div className="singlePost-pic-container">
              <div className="pic-container">
                <img src={postData?.pic} alt="post-image" />
              </div>
            </div>
          )}
        </div>
        <div className="singlePost-btn-container">
          <div className="like-btn-container">
            <button>
              <AiOutlineHeart />
            </button>
          </div>
          <div className="comment-btn-container">
            <button>
              <BiComment />
            </button>
          </div>
          <div className="bookmark-btn-container">
            <button onClick={()=>handleBookmark(postData._id, bookmarks, token)}>
              
              { 
                checkBookmark(postData._id, bookmarks) ? <BsBookmarkFill/> : <BsBookmark/>
              }
              
            </button>
          </div>
          <div className="share-btn-container">
            <button>
              <AiOutlineShareAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
