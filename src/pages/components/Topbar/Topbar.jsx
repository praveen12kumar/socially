import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./topbar.scss";
const Topbar = () => {
  const navigate = useNavigate();
  return (
    <div className='topbar' onClick={()=> navigate('/')} >
        <img src="https://i.ibb.co/NFCyHYS/socially.png" alt="logo" />
    </div>
  )
}

export default Topbar
