import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import "./explore.scss";
import Topbar from '../components/Topbar/Topbar';
import LeftDiv from '../components/leftside/LeftDiv';
import RightDiv from "../components/rightDiv/RightDiv";
import { DataContext } from '../../context/DataContext';
import SinglePost from '../common/singlePost/SinglePost';

import {AiOutlineSearch} from "react-icons/ai";

const Explore = () => {

  const {allPosts, dataDispatch} = useContext(DataContext);
  let filteredPosts = allPosts;
  // console.log("filteredPosts",  filteredPosts);   

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
        
    
    console.log("handleTrendingPosts", filteredPosts);
    }

  return (
    <>
      <Topbar/>
      <div className="explore-container" >
        <LeftDiv/>
          <div className="explore-main-container">
            {
              allPosts?.length === 0 ? <div className='explore-heading'><h1>No Posts to Show</h1></div> 
              :
              <div className="explore-main">

                  <div className="search-container">
                          
                            <span className="search-icon"><AiOutlineSearch/></span>
                            <input className='explore-search-input' type="text" placeholder='Search...' />
                          
                  </div>
                  <div className="explore-posts">
                  <div className="explore-btns">
                    <button onClick={(e)=>handleTrendingPosts(e)} className='trend-btn'>Trending</button>
                    <button onClick={(e)=>handleLatestPosts(e)} className='latest-btn'>Latest</button>
                  </div>
                {
                  filteredPosts?.map((postData)=>(
                    <SinglePost postData = {postData} key={postData._id}/>
                  ))
                }
                  </div>

              </div>
            }
          </div>
        <RightDiv/>
      </div>
    </>
  )
}

export default Explore
