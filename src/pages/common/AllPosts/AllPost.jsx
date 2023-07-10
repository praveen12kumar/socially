import React,{useContext} from 'react'
import { DataContext } from '../../../context/DataContext'
import SinglePost from '../singlePost/SinglePost';
import "./allPost.scss";

const AllPost = () => {
  const {allPosts, allUsers, currentuser} = useContext(DataContext);

 

 const filterdPost = allPosts?.filter((post)=> allUsers?.find((user)=> user?.username === currentuser?.username)?.following?.some((usr)=> usr.username ===post.username))


  
  
  return (
    <>
    <h1>Latest posts</h1> 
    <div className='allPost' >
      {
        filterdPost.length === 0 ? <div className="homepage-heading">Please follow someone to see their posts</div> :

            
            filterdPost?.map((postData) =>
            <SinglePost postData={postData} key={postData._id}/>)
        }
    </div>
    </>
  )
}

export default AllPost
