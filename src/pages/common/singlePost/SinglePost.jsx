import React, { useState, useContext } from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiFillHeart,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import {BsImageFill} from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "./singlePost.scss";
import { randomProfilePic } from "../../../resources/randomImages/RandomImages";
import { DataContext } from "../../../context/DataContext";
import { toast } from "react-toastify";
import axios from "axios";

const SinglePost = ({ postData }) => {
  const token = localStorage.getItem("encodedToken");
  const navigate = useNavigate();

  const [editmodalOpen, setEditModalOpen] = useState(false);

  const [editedData, setEditedData] = useState(postData);
  
  const { allUsers, allPosts, bookmarks, dataDispatch, currentuser } =
    useContext(DataContext);

  const userData = allUsers?.find(
    (user) => user.username === postData.username
  );

  const deleteClickHandler = (e, postDataId) => {
    console.log("deleteClickHandler");
    const filteredPosts = allPosts.filter((post) => post._id !== postDataId);
    dataDispatch({
      type: "AllPosts",
      payload: filteredPosts,
    });
    toast.warn("Post deleted");
  };

  const handleEditPost = async (editedData) => {
    const postData = {
      content: editedData.content,
      pic: editedData.pic,
      userId: currentuser?._id
    }

    try{
      const {data:{posts}} = await axios.post(`/api/posts/edit/:${editedData._id}`, {postData:{...postData}}, {headers:{authorization:token}});
      console.log('posts after edit', posts);
      dataDispatch({
        type: "AllPosts",
        payload: posts,
      })
      toast.success("Post added successfully")
    }
    catch(error){
      console.error(error)
    }
    setEditModalOpen(false)
  };

  // =========      bookmarks         =============================

  const addBookmark = async (postId, token) => {
    try {
      const {
        data: { bookmarks },
      } = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        { headers: { authorization: token } }
      );
      dataDispatch({
        type: "getNewBookmarks",
        payload: bookmarks,
      });
      toast.success("Added bookmark");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBookmark = async (postId, token) => {
    try {
      const {
        data: { bookmarks },
      } = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},
        { headers: { authorization: token } }
      );

      toast.warn("Bookmark Removed");
      dataDispatch({
        type: "getNewBookmarks",
        payload: bookmarks,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const checkBookmark = (postId, bookmarks) => {
    return bookmarks.some((bokmark) => bokmark._id === postId);
  };

  const handleBookmark = (postId, bookmarks, token) => {
    checkBookmark(postId, bookmarks)
      ? deleteBookmark(postId, token)
      : addBookmark(postId, token);
  };

  // =====================Likes and Unlikes =================

  const addLike = async (postId, token) => {
    try {
      const {
        data: { posts },
        status,
      } = await axios.post(
        `/api/posts/like/${postId}`,
        {},
        { headers: { authorization: token } }
      );
      console.log("Posts after like ", posts);
      dataDispatch({
        type: "AllPosts",
        payload: posts,
      });
      toast.success("Like updated");
    } catch (err) {
      console.error(err);
    }
  };

  const removeLike = async (postId, token) => {
    try {
      const {
        data: { posts },
        status,
      } = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        { headers: { authorization: token } }
      );
      console.log("posts after remove like", posts);

      dataDispatch({
        type: "AllPosts",
        payload: posts,
      });
      toast.warn("Like Removed");
    } catch (err) {
      console.log(err);
    }
  };

  const checkLikes = (postData) => {
    return postData?.likes?.likedBy?.some(
      (like) => like._id === currentuser?._id
    );
  };

  const handleLikes = (postData, token) => {
    checkLikes(postData)
      ? removeLike(postData._id, token)
      : addLike(postData._id, token);
  };

  const convertBase64 = (file)=>{

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () =>{
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) =>{
        reject(error)
      };
    })
  }

  const handleUpload =async(event) => {
    const file = event.target.files[0];
    
    const base64 = await convertBase64(file);
    setEditedData((prev)=>({...prev, pic:base64}))
    console.log("edited final data", editedData);
  }

  

  return (
    <div className="singlePost-container">
      <div className="singlePost-head">
        <div className="singlePost-postedBy">
          {" "}
          {/*navigate to postedId page*/}
          <div
            className="postedBy-profile"
            onClick={() => navigate(`/user/${postData.username}`)}
          >
            <img
              src={
                userData?.profile_pic ? userData?.profile_pic : randomProfilePic
              }
              alt="ProfilePic"
            />
          </div>
          <div
            className="singlePost-name-username-date"
            onClick={() => navigate(`/user/${postData.username}`)}
          >
            <p className="name">{`${userData?.firstName} ${userData?.lastName}`}</p>
            <p className="username">@{`${postData?.username}`}</p>
          </div>
          <p className="date">{new Date(postData?.createdAt).toDateString()}</p>
        </div>

              {/* // edit post  */}

        {postData?.username === currentuser?.username && (
          <div className="updatePost">
            <AiFillEdit
              className="editPost"
              onClick={() => setEditModalOpen(!editmodalOpen)}
            />

            {editmodalOpen && (
              <div className="edit-post-modal-container">
                <div className="edit-post-container">
                  <button
                    className="close-btn"
                    onClick={() => setEditModalOpen(!editmodalOpen)}
                  >
                    <TfiClose />
                  </button>
                  <div className="image-and-text">
                    <div className="profile-pic-container">
                      <img
                        src={
                          editedData?.profile_pic
                            ? editedData?.profile_pic
                            : postData?.postedBy?.profile_pic?.length > 0
                            ? postData?.postedBy?.profile_pic
                            : randomProfilePic
                        }
                        alt="profile"
                        className="profile-pic"
                      />
                    </div>
                    <textarea
                      name=""
                      id=""
                      cols="50"
                      rows="6"
                      className="post-textarea"
                      placeholder="What's happening?!"
                      defaultValue={editedData?.content}
                      onChange={(event) =>
                        setEditedData({
                          ...editedData,
                          content: event.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  {editedData.pic && (
                    <div className="modal-image-container">
                      <img
                        className="modal-image"
                        style={{
                          width: "180px",
                          height: "120px",
                          borderRadius: "10px",
                        }}
                        src={editedData.pic}
                        alt="Post image"
                      />
                      <span className="modal-image-cancel">
                        {
                          <MdOutlineCancel
                            onClick={() =>
                              setEditedData((prev) => ({ ...prev, pic: "" }))
                            }
                          />
                        }
                      </span>
                    </div>
                  )}

                  <div className="select-and-post-div">
                    <div className="select-Image-container">
                      <label className="image-btn" htmlFor="upload">
                        <BsImageFill />
                        <input
        
                          type="file"
                          id="upload"
                          style={{ display: "none" }}
                          accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                          onChange={(event) => {
                            handleUpload(event);
                          }}
                        />
                      </label>
                    </div>
                    <div className="edit-post-btn">
                      <button onClick={()=> handleEditPost(editedData)}>Post</button>
                    </div>
                  </div>

                  
                </div>
              </div>
            )}
            <AiFillDelete
              className="deletePost"
              onClick={(e) => deleteClickHandler(e, postData._id)}
            />
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
            <button
              className="like"
              onClick={() => handleLikes(postData, token)}
            >
              {checkLikes(postData) ? (
                <AiFillHeart style={{ color: "red" }} />
              ) : (
                <AiOutlineHeart className="open-heart" />
              )}
            </button>

            <span className="like-count">
              {postData?.likes?.likeCount === 0
                ? ""
                : `${postData?.likes?.likeCount}`}
            </span>
          </div>
          <div className="comment-btn-container">
            <button>
              <BiComment />
            </button>
          </div>
          <div className="bookmark-btn-container">
            <button
              onClick={() => handleBookmark(postData._id, bookmarks, token)}
            >
              {checkBookmark(postData._id, bookmarks) ? (
                <BsBookmarkFill />
              ) : (
                <BsBookmark />
              )}
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

// {postData?.username === currentuser.username && (
//   <div className="three-dots-container">
//     {isThreDotsOpen ? (
//       <button
//         className="dots-icons"
//         style={{ color: "red" }}
//         onClick={() =>
//           isThreDotsOpen
//             ? setIsThreDotsOpen(false)
//             : setIsThreDotsOpen(true)
//         }
//       >
//         <AiOutlineClose />
//       </button>
//     ) : (
//       <button
//         className="dots-icons"
//         onClick={() => setIsThreDotsOpen(true)}
//       >
//         <BsThreeDotsVertical />
//       </button>
//     )}
//     {isThreDotsOpen && (
//       <div className="threeDotsMenu">

//         <button className="option" onClick={()=> handleEditPost}>
//           Edit
//         </button>

//         <button className="option" onClick={(e)=> deleteClickHandler(e,postData._id)}>
//           Delete
//         </button>
//       </div>

//     )}

//   </div>

// )}
