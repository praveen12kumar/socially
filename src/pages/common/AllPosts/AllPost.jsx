import React,{useContext} from 'react'
import { DataContext } from '../../../context/DataContext'
import SinglePost from '../singlePost/SinglePost';
import "./allPost.scss";

const AllPost = () => {
  const {allPosts, state} = useContext(DataContext);

 
  
  return (
    <>
    <h1>Latest Posts</h1>
    <div className='allPost' >
      {
        state.allPosts?.map((postData) =>
          <SinglePost postData={postData} key={postData._id}/>)
      }
    </div>
    </>
  )
}

export default AllPost
