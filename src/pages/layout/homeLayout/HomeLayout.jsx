import React, {useContext, useEffect} from 'react'
import Home from '../../home/Home';
import { DataContext } from '../../../context/DataContext';
const HomeLayout = () => {
    
  const {getAllUsersHandler,
    getCurrentUser,
    getAllPosts,
    getAllBookmarks,} = useContext(DataContext);

    useEffect(()=>{
            getCurrentUser();
            getAllUsersHandler();
            getAllPosts();
            getAllBookmarks();
    },[]);

    // const{allUsers} = useContext(DataContext);

    // console.log("allUsers home layout",allUsers);

  return (
    <div className='homeLayout'>
       
        <Home/>
        
    </div>
  )
}

export default HomeLayout
