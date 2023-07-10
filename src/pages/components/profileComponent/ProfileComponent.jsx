import React, {useContext,} from 'react'
import { useNavigate } from 'react-router-dom';
import {BiEditAlt} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import { DataContext } from '../../../context/DataContext';
import "./profileComponent.scss";
import {randomCoverPic, randomProfilePic} from "../../../resources/randomImages/RandomImages"
import SinglePost from '../../common/singlePost/SinglePost';
import { AuthContext } from '../../../context/AuthContext';



const ProfileComponent = () => {
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    const {allUsers, currentuser, allPosts} = useContext(DataContext);
    console.log("current user at profile",currentuser)
  
    const handleLogout = ()=>{
      logout();
      navigate('/');
    }
  
    const profile = allUsers.find((user)=> user.username === currentuser.username);

    const filteredPost = allPosts.filter((post)=> post.username === profile.username)
    
    return (
    <div className='profile-container'>
      <div className="cover-photo">
        <img src={profile?.cover_pic  ? profile?.cover_pic : randomCoverPic} alt="cover photo" />
      </div>
      <div className="profile-image-edit">
        <div className="profile-image">
          <img src={profile?.profile_pic ? profile?.profile_pic : randomProfilePic } alt="profile pic" />
        </div>

        <div className="profile-edit">
          <button ><BiEditAlt/> Profile</button>
          <button onClick={handleLogout}  ><FiLogOut/></button>
        </div>
      </div>
      <div className="profile-details">
        <div className="name-username-email">
          <p className='name'>{`${profile?.firstName} ${profile?.lastName}`}</p>
          <p className='profile-username'>{`@${profile?.username}`}</p>
          <a className='email' href={`mailto:${profile?.user_email}`}>Email:{profile?.user_email}</a>
          <p className='bio'>{profile?.bio}</p>
          {profile?.link && <a href={profile?.link} className='website' target='_'>{profile?.link?.slice(8)} </a>
          }
        </div>
        <div className="follow-unfollow">
          <button>{`${profile?.following?.length} following`}</button>
          <button>{`${profile?.followers?.length} followers`}</button>
        </div>
      </div>

      

      <div className="profile-posts-container">
        {
          filteredPost?.length === 0 ? <div className="profile-header"><h1>No Post to show</h1></div> :
          filteredPost?.map((postData)=>( 
            <SinglePost postData={postData}/>))
        }
      </div>

      
    </div>
  )
}

export default ProfileComponent
