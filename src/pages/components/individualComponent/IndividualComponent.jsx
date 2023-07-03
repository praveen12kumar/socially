import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { DataContext } from "../../../context/DataContext";
import "./individualComponent.scss";
import {
  randomCoverPic,
  randomProfilePic,
} from "../../../resources/randomImages/RandomImages";

const IndividualComponent = () => {
  const { username } = useParams();
  const { allUsers, currentuser } = useContext(DataContext);

  const profile = allUsers?.filter((user) => user.username === username)[0];

  const unfollowHandler = ()=>{

  }
  const followHandler = ()=>{

  }

  return (
    <div className="profile-container">
      <div className="cover-photo">
        <img
          src={
            profile?.cover_pic?.length > 0 ? profile?.cover_pic : randomCoverPic
          }
          alt="cover photo"
        />
      </div>
      <div className="profile-image-edit">
        <div className="profile-image">
          <img
            src={
              profile?.profile_pic.length > 0
                ? profile?.profile_pic
                : randomProfilePic
            }
            alt="profile pic"
          />
        </div>
        {/* follow unfollow btn section */}
        <div className="profile-edit">
          {profile?.following.find((user) => user?._id === profile._id) ? (
            <button
              className="unfollow-follow"
              onClick={() => unfollowHandler(profile)}
            >
              <span className="text">Unfollow</span>
            </button>
          ) : (
            <button
              className="unfollow-follow"
              onClick={() => followHandler(profile)}
            >
              <span className="text">Follow</span>
            </button>
          )}
        </div>
      </div>
      <div className="profile-details">
        <div className="name-username-email">
          <p className="name">{`${profile?.firstName} ${profile?.lastName}`}</p>
          <p className="profile-username">{`@${profile?.username}`}</p>
          <a className="email" href={`mailto:${profile?.user_email}`}>
            Email:{profile?.user_email}
          </a>
          <p className="bio">{profile?.bio}</p>
          {profile?.link && (
            <a href={profile?.link} className="website" target="_">
              {profile?.link?.slice(8)}{" "}
            </a>
          )}
        </div>
        <div className="follow-unfollow">
          <button>{`${profile?.following?.length} following`}</button>
          <button>{`${profile?.followers?.length} followers`}</button>
        </div>
      </div>
    </div>
  );
};

export default IndividualComponent;
