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
 
  const [modalOpen, setModalOpen] = useState(false);

  const {allUsers, allPosts, bookmarks, dataDispatch, currentuser} = useContext(DataContext);

  const userData = allUsers?.find((user)=> user.username === postData.username);
  
  
  const deleteClickHandler = (postDataId) => {  
     console.log("post id",postDataId);

      const filteredPosts =  allPosts.filter((post)=> post._id !== postDataId)
      dataDispatch({
        type:"AllPosts",
        payload: filteredPosts
      })
      toast.warn("Post deleted")
  };
  
// =========      bookmarks         =============================

  const addBookmark = async(postId, token)=>{
    try{
      const {data:{bookmarks}}= await axios.post(`/api/users/bookmark/${postId}`, {}, {headers:{authorization:token}});
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
      const {data:{bookmarks}} = await axios.post(`/api/users/remove-bookmark/${postId}`,{}, {headers:{authorization:token}})
      
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

  // =====================Likes and Unlikes =================

  const addLike = async (postId, token)=>{
        try{
          const {data:{posts},status} = await axios.post(`/api/posts/like/${postId}`,{},{headers:{authorization:token}})
          console.log("Posts after like ", posts);
          dataDispatch({
            type:"AllPosts",
            payload:posts,
          })
          toast.success("Like updated");
        }
        catch(err){
          console.error(err)
        }
  }

  const removeLike = async (postId, token)=>{
      try{
          const{data:{posts},status} = await axios.post(`/api/posts/dislike/${postId}`,{},{headers:{authorization:token}})
          console.log("posts after remove like", posts);
         
          dataDispatch({
            type:"AllPosts",
            payload:posts,
          })
          toast.warn("Like Removed");

      }
      catch(err){
          console.log(err)
      }
  }

  const checkLikes = (postData)=>{
    
    return (postData?.likes?.likedBy?.some((like)=> like._id === currentuser?._id))
  }

  const handleLikes = (postData, token)=>{
    checkLikes(postData) ? removeLike(postData._id, token) : addLike(postData._id, token);
  }


  //console.log("postData", postData);

  return (
    
    <div className="singlePost-container">
      
      <div className="singlePost-head">
        <div className="singlePost-postedBy">
          {" "}
          {/*navigate to postedId page*/}
          <div className="postedBy-profile" onClick={()=>navigate(`/user/${postData.username}`)}>
            <img
              src={
                userData?.profile_pic
                  ? userData?.profile_pic
                  : randomProfilePic
              }
              alt="ProfilePic"
            />
          </div>
          <div className="singlePost-name-username-date" onClick={()=>navigate(`/user/${postData.username}`)}>
            <p className="name">{`${userData?.firstName} ${userData?.lastName}`}</p>
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
                <button className="option1" onClick={() => setModalOpen(true)}>
                  Edit
                </button>
                <button className="option2" onClick={() => deleteClickHandler(postData._id)}>
                  Delete
                </button>
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
            <button className="like"  onClick={()=> handleLikes(postData, token)} >
              {
                checkLikes(postData) ?  <AiFillHeart style={{color:"red"}} /> :<AiOutlineHeart className="open-heart"/> 
              }
            </button>
           
              <span className="like-count">{postData?.likes?.likeCount === 0 ? "" : `${postData?.likes?.likeCount}`}</span>
            
          </div>
          <div className="comment-btn-container"  >
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
