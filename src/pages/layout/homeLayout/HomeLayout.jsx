import React, {useContext, useEffect} from 'react'
import Home from '../../home/Home';
import Topbar from '../../components/Topbar/Topbar';
import { DataContext } from '../../../context/DataContext';
const HomeLayout = () => {
    
  const {state, getAllUsersHandler,
    getCurrentUser,
    getAllPosts,
    getAllBookmarks,} = useContext(DataContext);

    useEffect(()=>{
            getCurrentUser();
            getAllUsersHandler();
            getAllPosts();
            getAllBookmarks();
    },[]);

  return (
    <div className='homeLayout'>
      
        <Topbar/>
        
        <Home/>
        
    </div>
  )
}

export default HomeLayout
