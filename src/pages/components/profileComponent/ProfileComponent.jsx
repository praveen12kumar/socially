import React, {useContext,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {BiEditAlt} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import { DataContext } from '../../../context/DataContext';
import "./profileComponent.scss";
import {randomCoverPic, randomProfilePic} from "../../../resources/randomImages/RandomImages"
import SinglePost from '../../common/singlePost/SinglePost';
import { AuthContext } from '../../../context/AuthContext';
import ProfileModalComponent from './modalComponent/ModalComponent';
import axios from "axios";
import { toast } from "react-toastify";

const ProfileComponent = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("encodedToken");
    const {logout} = useContext(AuthContext);
    const {allUsers, currentuser, allPosts, dataDispatch} = useContext(DataContext);
    
    const [openFollow, setOpenFollow] = useState("");
  


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

    const followCheck = (id)=>{
      const t =  profile?.following?.some((user)=> user._id == id )
      console.log("followCheck follower", t);
      return t;
    }
    


    const unfollowHandler = async (profile_id, token) => {
      try {
        const {
          data: { user, followUser },
          status,
        } = await axios.post(
          `/api/users/unfollow/${profile_id}`,
          {},
          { headers: { authorization: token } }
        );
        //console.log("unfollow user: ", user, followUser);
        toast.warn("user unfollowed");
        dataDispatch({
          type: "update_follow_user",
          payload: { user, followUser },
        });
      } catch (err) {
        console.log(err);
      }
    };

    const followHandler = async (userId, token) => {
      try{
        const {data:{user, followUser}, status} = await axios.post(`/api/users/follow/${userId}`, {}, {headers: {authorization:token}})
        dataDispatch({
          type:"update_follow_user",
          payload: {user, followUser}
        })
        toast.success("user followed");      
      }
      catch(err){
        console.error(err);
      }
  }
  
    

    let filteredPost = allPosts?.filter((post)=> post.username === profile.username)
    filteredPost =   filteredPost?.sort((a, b) => {
                        let da = new Date(a.createdAt),
                            db = new Date(b.createdAt);
                            return db - da;
  })

  
    
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
          <button className='following-btn' onClick={()=> setOpenFollow("following")} >{`${profile?.following?.length} following`}</button>
          {
            openFollow === "following" ? 
            <div className='followModal'>
              <div className="follow-main">
                <button className='cancelOpenFollow' onClick={()=> setOpenFollow("")}><AiOutlineClose/> </button>
                {
                  profile?.following?.map((following)=>(
                    <div className="follower-div" key={following._id}>
                      {console.log("following",following)}
                      <div className="left-section">
                        <div className="follower-img-container">
                         
                          <img src={following?.profile_pic?.length > 0 ? following?.profile_pic : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'} alt="" />
                        </div>
                        <div className="details">
                          <p className="follower-name">{`${following?.firstName} ${following?.lastName}`}</p>
                          <p className="follower-username">{`@${following?.username}`}</p>
                        </div>
                      </div>
                      <div className="right-section">
                        
                           <button className="unfollow"
                              onClick={() => unfollowHandler(following?._id, token)}
                              >Unfollow</button> :
                        
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            
            : null
          }
          <button className='followers-btn' onClick={()=> setOpenFollow("follower")}>{`${profile?.followers?.length} followers`}</button>
          {
            openFollow === "follower" ? 
            <div className='followModal'>
              <div className="follow-main">
                <button className='cancelOpenFollow' onClick={()=> setOpenFollow("")}><AiOutlineClose/> </button>
                {
                  profile?.followers.map((follower)=>(
                    <div className="follower-div" key={follower._id}>
                      {console.log("follower",follower)}
                      <div className="left-section">
                        <div className="follower-img-container">
                          
                          <img src={follower?.profile_pic?.length > 0 ? follower?.profile_pic : 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'} alt="" />
                        </div>
                        <div className="details">
                          <p className="follower-name">{`${follower?.firstName} ${follower?.lastName}`}</p>
                           <p className="follower-username">{`@${follower?.username}`}</p>
                        </div>
                      </div>
                      <div className="right-section">
                        {followCheck(follower?._id) ?
                           <button className="unfollow"
                              onClick={() => unfollowHandler(follower?._id, token)}
                              >Unfollow</button> :
                              <button className="unfollow"
                                onClick={() => followHandler(follower?._id, token)}
                                >Follow Back</button>
                        }
                      </div>
                    </div>
                  )) 
                }
              </div>
            </div>
            : null
          }
        </div>
      </div>



      <div className="profile-posts-container">
        {
          filteredPost?.length === 0 ? <div className="profile-header"><h1>No Post to show</h1></div> :
          filteredPost?.map((postData)=>( 
            <SinglePost postData={postData} key={postData._id} />))
        }
      </div>

      
    </div>
  )
}

export default ProfileComponent
