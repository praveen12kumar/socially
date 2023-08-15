import React from 'react'
import LeftDiv from '../components/leftside/LeftDiv';
import RightDiv from '../components/rightDiv/RightDiv';
import IndividualComponent from '../components/individualComponent/IndividualComponent';

import "./individualUser.scss";
const IndividualUser = () => {
  return (
    <div className='individual-main-container'>
        <LeftDiv/>
        <div className="individual-component">
            <IndividualComponent/>
        </div>
        <RightDiv/>
    </div>
  )
}

export default IndividualUser
