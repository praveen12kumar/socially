import React,{useContext} from 'react'
import "./bookmark.scss"
import { DataContext } from '../../context/DataContext'
import SinglePost from '../common/singlePost/SinglePost'
import LeftDiv from '../components/leftside/LeftDiv'
import RightDiv from '../components/rightDiv/RightDiv'


const Bookmark = () => {
  
  const {bookmarks, allPosts} = useContext(DataContext);

  const filteredData = allPosts.filter((post)=> (bookmarks.some((bukmrk)=>bukmrk._id === post._id)));
  
  return (
    <div className='bookmark-container'>
      <LeftDiv/>
      <div className="bookmark-section">
      {
        bookmarks?.length === 0 
        ? 
          <div className="bookmark-heading">
            <h1>No Bookmarks</h1>
          </div>
        :
          <div className="bookmark-main-container">
            {
              filteredData?.map((postData)=> <SinglePost postData={postData} key={postData._id} />)
            }
          </div>

      }
      </div>
      <RightDiv/>
    </div>
  )
}

export default Bookmark
