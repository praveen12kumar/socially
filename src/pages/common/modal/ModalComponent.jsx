import React,{useContext, useState} from 'react'
import { Button, Modal } from 'antd';
import { DataContext } from '../../../context/DataContext';
import {randomProfilePic} from "../../../resources/randomImages/RandomImages"
import {BsImageFill} from "react-icons/bs";
import {MdOutlineCancel} from "react-icons/md";
import {toast} from "react-toastify";
import axios from 'axios';
import "./modalComponent.scss";


const ModalComponent = ({modalOpen, setModalOpen,postInput, setPostInput}) => {

  const token = (localStorage.getItem('encodedToken'));

  const {allUsers, currentuser, dataDispatch} = useContext(DataContext);
  
  const profile = allUsers?.find((user)=> user.username === currentuser.username);

 

  
  const reset = ()=>{
    setPostInput((prev)=>({
      content:"",
      pic:"",
    }))
  }

  const convertBase64 = (file)=>{

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () =>{
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) =>{
        reject(error)
      };
    })
  }

  const handleUpload =async(event) => {
    const file = event.target.files[0];
    
    const base64 = await convertBase64(file);
    setPostInput((prev)=>({...prev, pic:base64}))
  }

  const sendStatus =  async(postInput, token)=>{
    //e.preventDefault();
    const postData = {
      ...postInput,
      userId: currentuser?._id
    }

    try{
      const {data:{posts},status} = await axios.post(`/api/posts/`, {postData:{...postData}}, {headers:{authorization:token}});
      console.log("updated post data:", posts);
      dataDispatch({
        type: "AllPosts",
        payload: posts,
      })
    }
    catch(error){
      console.error(error)
    }

    

    console.log("clicked");   
    setModalOpen(false)
   }
  
  return (

    <div >
    
    <Modal
        title="Write Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          
          <div className='select-Image-container'>
          <label className='image-btn' htmlFor="upload"><BsImageFill/>
          <input type="file" id='upload' style={{display:"none"}}
          accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
          onChange={(event)=> {handleUpload(event)}} />
          </label>
          </div>,


          <Button 
            key="submit" 
            type="primary" 
            disabled={postInput.content.length > 0 ? false : true} 
            onClick={()=>sendStatus(postInput, token)}
            >
            Post
           </Button>,
          ]}
      >

        <div className="modal-post-container">
          <div className="modal-upper">
            <div className="modal-profile">
                <img src={profile?.profile_pic ? profile?.profile_pic : randomProfilePic } alt="" />
            </div>
            <div className="modal-content">
            <textarea
              rows="5"
              cols="40"
              className="modal-input" 
              type="text" 
              placeholder='Write something...'
              onChange={(e)=> setPostInput((prev)=>({
                ...prev, content: e.target.value}))
              }
              value={postInput.content}/> 
            </div>
          </div>
          {/* add a div for image preview */}
          {postInput.pic &&  <div className="modal-image-container">
            <img className='modal-image' style={{width:"130px", height:"90px"}} src={postInput.pic} alt="Post image" />
            <span className='modal-image-cancel'>{<MdOutlineCancel onClick={()=> setPostInput((prev)=> ({...prev, pic:""}))}/>}</span>
          </div>}
        </div>
      </Modal>
    </div>
  )
}

export default ModalComponent


