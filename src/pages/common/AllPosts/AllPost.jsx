import React,{useContext} from 'react'
import { DataContext } from '../../../context/DataContext'
import SinglePost from '../singlePost/SinglePost';
import "./allPost.scss";

const AllPost = () => {
  const {allPosts} = useContext(DataContext);
  const userData  = JSON.parse(localStorage.getItem('userData'));
 
  
  return (
    <div className='allPost' >
      <h1>Latest Posts</h1>
      {
        allPosts.map((postData) =>
          <SinglePost postData={postData} key={postData._id}/>)
      }
    </div>
  )
}

export default AllPost
