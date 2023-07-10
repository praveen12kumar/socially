import React, { useContext } from "react";
import { Button, Modal } from "antd";
import { BiImageAdd } from "react-icons/bi";
import { DataContext } from "../../../../context/DataContext";
import axios from "axios";
import {toast} from "react-toastify";

import "./modalprofile.scss";
import {
  randomCoverPic,
  randomProfilePic,
} from "../../../../resources/randomImages/RandomImages";

const ProfileModalComponent = ({ profileModalOpen, setProfileModalOpen, editedUserData, setEditedUserData }) => {
  const token = (localStorage.getItem('encodedToken'));
  const { allUsers, currentuser, dataDispatch } = useContext(DataContext);
  const profile = allUsers?.find(
    (user) => user.username === currentuser.username
  );

  

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files[0];

    const base64 = await convertBase64(file);
    setEditedUserData((prev) => ({ ...prev, cover_pic: base64 }));
  };

  const handleProfileUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setEditedUserData((prev) => ({ ...prev, profile_pic: base64 }));
  };

  const firstNameChangeHandler = (event) => {
    setEditedUserData({ ...editedUserData, firstName: event.target.value })
    console.log(editedUserData.firstName);
}

const lastNameChangeHandler = (event) => {
    setEditedUserData({ ...editedUserData, lastName: event.target.value })
    console.log(editedUserData.lastName);
}

const emailChangeHandler = (event) => {
    setEditedUserData({ ...editedUserData, user_email: event.target.value })
    
}

const bioChangeHandler = (event) => {
    setEditedUserData({ ...editedUserData, bio: event.target.value })
    
}

const linkChangeHandler = (event) => {
    setEditedUserData({ ...editedUserData, link: event.target.value })
   
}

    const isEmail = (email) => email ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(email) : true;

    const isURLValid = (url) => url ? /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/.test(url) : true


const updateEditProfile = async(editedUserData, token)=>{
  const userData = {
    ...editedUserData,
    username: profile?.username,
  }

  try{
    const {data:{user}} = await axios.post(`/api/users/edit`, {userData:{...userData}}, {headers:{authorization:token}});
    console.log("updated user data:", user);
    dataDispatch({
      type: "update_user",
      payload: user,
    })
    toast.success("Profile updated successfully");
  }
  catch(error){
    console.error(error)
  }
  setProfileModalOpen(false)
 }
  




  return (
    <div>
      <Modal
        title="Edit Profile"
        centered
        open={profileModalOpen}
        onOk={() => setProfileModalOpen(false)}
        onCancel={() => setProfileModalOpen(false)}


        footer={[
          <Button 
            key="submit" 
            type="primary" 
            onClick={()=>updateEditProfile(editedUserData, token)}
            >
            Save
           </Button>,
        ]}
      >
        <div className="edit-container">
          <div className="cover-image-container">
            <img
              src={
                editedUserData?.cover_pic
                  ? editedUserData?.cover_pic
                  : profile?.cover_pic?.length > 0
                  ? profile?.cover_pic
                  : randomCoverPic
              }
              alt=""
            />
            <div className="select-cover-container">
              <label className="image-btn" htmlFor="upload">
                <BiImageAdd />
                <input
                  type="file"
                  id="upload"
                  style={{ display: "none" }}
                  accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                  onChange={(event) => {
                    handleCoverUpload(event);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="profile-image-container">
            <img
              className="profile-image"
              src={
                editedUserData?.profile_pic
                  ? editedUserData?.profile_pic
                  : profile?.profile_pic?.length > 0
                  ? profile?.profile_pic
                  : randomProfilePic
              }
              alt=""
            />

            <div className="select-profile-container">
              <label className="image-btn" htmlFor="upload-profile">
                <BiImageAdd />
                <input
                  type="file"
                  id="upload-profile"
                  style={{ display: "none" }}
                  accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                  onChange={(event) => {
                    handleProfileUpload(event);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="profile-details-container">
            <label htmlFor="" className="edit-user-fist-name">
              <span className="text">First Name</span>
              <input className="edit-first-name" type="text" defaultValue={`${profile?.firstName}`}
               onChange={(event)=> firstNameChangeHandler(event) }
               placeholder="First Name"
              />
            </label>

            <label htmlFor="" className="edit-user-last-name">
              <span className="text">Last Name</span>
              <input className="edit-last-name" type="text" defaultValue={`${profile?.lastName}`}
               onChange={(event)=> lastNameChangeHandler(event) }
               placeholder="Last Name"
              />
            </label>
            <label htmlFor="" className="edit-user-email">
              <span className="text">Email</span>
              <input className="edit-user-email" type="email"  defaultValue={`${profile?.user_email}`}
               onChange={(event)=> emailChangeHandler(event) }
               placeholder="Email"
              />
            </label>
            <label htmlFor="" className="edit-user-bio">
              <span className="text">Bio</span>
              <input className="edit-user-bio" type="text" defaultValue={`${profile?.bio}`}
               onChange={(event)=> bioChangeHandler(event) }
               placeholder="Bio"
              />
            </label>
            <label htmlFor="" className="edit-user-website">
              <span className="text">Website</span>
              <input className="edit-user-link" type="text" defaultValue={`${profile?.link}`}
               onChange={(event)=> linkChangeHandler(event) }
               placeholder="Website"
              />
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModalComponent;
