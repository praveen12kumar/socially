import React,{useState} from 'react';
import {AiOutlineHeart, AiOutlineShareAlt, AiOutlineClose} from "react-icons/ai";
import {BiComment} from "react-icons/bi";
import {BsBookmark, BsThreeDotsVertical} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import "./singlePost.scss";

const SinglePost = ({postData}) => {
  

  const navigate = useNavigate();
  const profileId = JSON.parse(localStorage.getItem("userData"))?.id;
  const [isThreDotsOpen, setIsThreDotsOpen] = useState(false); 
  const [isEditPostModal, setIsEditPostModal] = useState(false);
  

  const deleteClickHandler = ()=>{

  }
  
  
  return (
    <div className='singlePost-container'>
        <div className="singlePost-head">
          <div className="singlePost-postedBy"> {/*navigate to postedId page*/}
            <div className="postedBy-profile">
              <img src={postData?.postedBy?.profile_pic}  alt="ProfilePic" />
            </div>
            <div className="singlePost-name-username-date">
              <p className='name'>{`${postData?.postedBy?.firstName} ${postData?.postedBy?.lastName}`}</p>
              <p className='username'>@{`${postData?.username}`}</p>
            </div>
            <p className='date'>{new Date(postData?.createdAt).toDateString()}</p>
          </div>
          {
            postData?.postedBy?._id === profileId &&
              <div className="three-dots-container">
                {
                  isThreDotsOpen ? 
                    <button className='dots-icons' style={{color:"red"}} onClick={()=> isThreDotsOpen ? setIsThreDotsOpen(false) :setIsThreDotsOpen(true) }>
                      <AiOutlineClose/>
                    </button>
                    :
                    <button className="dots-icons" onClick={()=>setIsThreDotsOpen(true)}>
                      <BsThreeDotsVertical/>
                    </button>
                }
                {
                  isThreDotsOpen &&
                    <div className="threeDotsMenu">
                      <p className='option1' onClick={()=> setIsEditPostModal(true)}>Edit</p>
                      <p className='option2' onClick={()=>deleteClickHandler}>Delete</p>
                    </div>
                }
              </div>
          }
        </div>
        <div className="singlePost-body">
          <div className="content-pic">
            <p className='singlePost-content'>{postData?.content}</p>
            {
              postData?.pic && 
                <div className="singlePost-pic-container">
                  <div className="pic-container">
                      <img src={postData?.pic}  alt="post-image" />
                  </div>
                </div>
            }
          </div>
          <div className="singlePost-btn-container">
            <div className="like-btn-container">
              {/* {
                postData?.like?.likedBy?.find((user)=> user._id === profileId)
              } */}
            </div> 
          </div>
        </div>
    </div>
  )
}

export default SinglePost
