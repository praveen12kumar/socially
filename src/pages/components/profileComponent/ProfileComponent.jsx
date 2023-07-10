import React, {useContext,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {BiEditAlt} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import { DataContext } from '../../../context/DataContext';
import "./profileComponent.scss";
import {randomCoverPic, randomProfilePic} from "../../../resources/randomImages/RandomImages"
import SinglePost from '../../common/singlePost/SinglePost';
import { AuthContext } from '../../../context/AuthContext';
import ProfileModalComponent from './modalComponent/ModalComponent';


const ProfileComponent = () => {
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    const {allUsers, currentuser, allPosts} = useContext(DataContext);
    

    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const profile = allUsers?.find((user)=> user.username === currentuser.username);
  

    const [editedUserData, setEditedUserData] = useState({
      cover_pic: profile?.cover_pic,
      profile_pic: profile?.profile_pic,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      user_email: profile?.user_email,
      bio: profile?.bio,
      link: profile?.link,
    });

    const handleLogout = ()=>{
      logout();
      navigate('/');
    }
  
    

    let filteredPost = allPosts?.filter((post)=> post.username === profile.username)
    filteredPost =   filteredPost?.sort((a, b) => {
                        let da = new Date(a.createdAt),
                            db = new Date(b.createdAt);
                            return db - da;
  })

  console.log("filteredPost", filteredPost)
    
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
          <button onClick={()=> setProfileModalOpen(true)} ><BiEditAlt/> Profile</button>
          <button onClick={handleLogout}><FiLogOut/></button>
          {/* Edit profile component */}
          <div className="modal">
            <ProfileModalComponent
              profileModalOpen={profileModalOpen}
              setProfileModalOpen={setProfileModalOpen}
              editedUserData = {editedUserData}
              setEditedUserData = {setEditedUserData}
            />
          </div>
        </div>
      </div>
      <div className="profile-details">
        <div className="name-username-email">
          <p className='name'>{`${profile?.firstName} ${profile?.lastName}`}</p>
          <p className='profile-username'>{`@${profile?.username}`}</p>
          <a className='email' href={`mailto:${profile?.user_email}`}>Email:{profile?.user_email}</a>
          <p className='bio'>{profile?.bio}</p>
          {profile?.link && <a href={profile?.link} className='website' target='_'>{profile?.link?.slice(8)} </a>}
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
