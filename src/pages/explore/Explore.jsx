import React,{useContext, useEffect} from 'react'
import "./explore.scss";
import LeftDiv from '../components/leftside/LeftDiv';
import RightDiv from "../components/rightDiv/RightDiv";
import { DataContext } from '../../context/DataContext';
import SinglePost from '../common/singlePost/SinglePost';

import {AiOutlineSearch} from "react-icons/ai";

const Explore = () => {

  const {allPosts, dataDispatch, getAllPosts, searchPost} = useContext(DataContext);
  let filteredPosts = allPosts;
  

  
  const handleLatestPosts = (e)=>{
      e.preventDefault();
       filteredPosts = allPosts?.sort((a, b) => {
          let da = new Date(a.updatedAt),
          db = new Date(b.updatedAt);
          return db - da;
      })

      dataDispatch({
        type:"AllPosts",
        payload: filteredPosts,
      })
    }

    const handleTrendingPosts = (e)=>{
      e.preventDefault();
      filteredPosts = allPosts?.sort((a, b)=>{
        return  b?.likes?.likeCount - a?.likes?.likeCount
      })

      dataDispatch({
        type:"AllPosts",
        payload: filteredPosts,
      })
    };

    const handlePostSearch = (value)=>{
      dataDispatch({
        type:"postSearch",
        payload: value,
      })
    }
    
   let filteredNewPost = searchPost ? filteredPosts?.filter((post)=> post.content.toLowerCase().includes(searchPost.toLowerCase())) : filteredPosts
  
     
    useEffect(()=>{
      getAllPosts();
    },[])

  return (
      <div className="explore-container" >
        <LeftDiv/>
          <div className="explore-main-container">
            {
              allPosts?.length === 0 ? <div className='explore-heading'><h1>No Posts to Show</h1></div> 
              :
              <div className="explore-main">

                  <div className="search-container">
                          
                            <span className="search-icon"><AiOutlineSearch/></span>
                            <input className='explore-search-input' type="text" placeholder='Search...' onChange={(event)=> handlePostSearch(event.target.value)} />
                          
                  </div>
                  <div className="explore-posts">
                  <div className="explore-btns">
                    <button onClick={(e)=>handleTrendingPosts(e)} className='trend-btn'>Trending</button>
                    <button onClick={(e)=>handleLatestPosts(e)} className='latest-btn'>Latest</button>
                  </div>
                {
                  filteredNewPost?.map((postData)=>(
                    <SinglePost postData = {postData} key={postData._id}/>
                  ))
                }
                  </div>

              </div>
            }
          </div>
        <RightDiv/>
      </div>
  )
}

export default Explore
