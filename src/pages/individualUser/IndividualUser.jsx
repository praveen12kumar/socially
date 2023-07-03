import React from 'react'
import LeftDiv from '../components/leftside/LeftDiv';
import RightDiv from '../components/rightDiv/RightDiv';
import IndividualComponent from '../components/individualComponent/IndividualComponent';
import Topbar from '../components/Topbar/Topbar';
import "./individualUser.scss";
const IndividualUser = () => {
  return (
    <>  
    <Topbar/>  
    <div className='individual-main-container'>
        <LeftDiv/>
        <div className="individual-component">
            <IndividualComponent/>
        </div>
        <RightDiv/>
    </div>
    </>
  )
}

export default IndividualUser
