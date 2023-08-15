import React from 'react';

import LeftDiv from '../components/leftside/LeftDiv';
import RightDiv from '../components/rightDiv/RightDiv';
import ProfileComponent from '../components/profileComponent/ProfileComponent';
import "./profile.scss";


const Profile = () => {
  return (
    <div className='profile-main-container'>
       
        <LeftDiv/>
        <div className='profile-component'>
          <ProfileComponent/>
        </div>
        <RightDiv/>
    </div>
  )
}

export default Profile
