import React from 'react'
import Home from '../../home/Home';
import Topbar from '../../components/Topbar/Topbar';

const HomeLayout = () => {
    
    

  return (
    <div className='homeLayout'>
        <Topbar/>
        <Home/>
    </div>
  )
}

export default HomeLayout
