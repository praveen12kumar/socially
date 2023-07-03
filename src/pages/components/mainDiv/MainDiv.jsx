import React from 'react';
import CreatePost from '../../common/createPost/CreatePost'; 
import AllPost from '../../common/AllPosts/AllPost';
import "./mainDiv.scss";

const MainDiv = () => {
  return (
    <div className='feed-section'>
      <CreatePost/>
      <AllPost/>
    </div>
  )
}

export default MainDiv
