import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../context/DataContext";
import "./individualComponent.scss";
import {
  randomCoverPic,
  randomProfilePic,
} from "../../../resources/randomImages/RandomImages";
import SinglePost from "../../common/singlePost/SinglePost";
import { toast } from "react-toastify";
import axios from "axios";

const IndividualComponent = () => {
  const token = localStorage.getItem("encodedToken");
  const { username } = useParams();
  const { allUsers, allPosts, dataDispatch, currentuser } =
    useContext(DataContext);

  const profile = allUsers?.find((user) => user.username === username);
  console.log(profile);
  const filteredPost = allPosts.filter((post) => post.username === username);

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
  const followHandler = async (profile_id, token) => {
    try {
      const {
        data: { user, followUser },
        status,
      } = await axios.post(
        `/api/users/follow/${profile_id}`,
        {},
        { headers: { authorization: "token" } }
      );
      toast.success("user followed");
      dataDispatch({
        type: "update_follow_user",
        payload: { user, followUser },
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("updated profile", profile);
  return (
    <div className="individual-container">
      <div className="individual-main-container">
        <div className="cover-photo">
          <img
            src={
              profile?.cover_pic?.length > 0
                ? profile?.cover_pic
                : randomCoverPic
            }
            alt="cover photo"
          />
        </div>
        <div className="individual-image-edit">
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
          <div className="individual-edit-btn">
            {profile?.followers.find(
              (user) => user?._id === currentuser?._id
            ) ? (
              <button
                className="unfollow-follow"
                onClick={() => unfollowHandler(profile?._id, token)}
              >
                <span className="text">Unfollow</span>
              </button>
            ) : (
              <button
                className="unfollow-follow"
                onClick={() => followHandler(profile?._id, token)}
              >
                <span className="text">Follow</span>
              </button>
            )}
          </div>
        </div>
        <div className="individual-details">
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
      <div className="individual-posts-container">
        {filteredPost?.length === 0 ? (
          <div className="individual-header">
            <h1>No Post to show</h1>
          </div>
        ) : (
          filteredPost?.map((postData) => <SinglePost postData={postData} />)
        )}
      </div>
    </div>
  );
};

export default IndividualComponent;
