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

  const {allPosts} = useContext(DataContext);


  return (
    <>
      <Topbar/>
      <div className="explore-container">
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
                {
                  allPosts?.map((postData)=>(
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
