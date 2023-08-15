import React from 'react'
import "./home.scss";
import LeftDiv from '../components/leftside/LeftDiv';
import MainDiv from '../components/mainDiv/MainDiv';
import RightDiv from '../components/rightDiv/RightDiv';





const Home = () => {       
    


  return (
    <div className='home'>
      
      <LeftDiv/>
      
      <MainDiv/>
      
      <RightDiv/>
    </div>
  )
}

export default Home
