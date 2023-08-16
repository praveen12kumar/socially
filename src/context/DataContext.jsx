import {useReducer, createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { dataReducer } from "../reducers/DataReducer";


export const DataContext = createContext();

export const DataProvider = ({children})=>{
    
    const initialValues = {
        allUsers: [],
        allPosts: [],
        bookmarks: [],
        currentuser:{},
        followedUser:[],
        postData:{},
        searchPost:"",
        searchUser:"",
        active:"home",
    }
    const [state, dispatch] = useReducer(dataReducer, initialValues);
    const encodedToken = (localStorage.getItem('encodedToken'));
    

    const getAllUsersHandler = async()=>{
        try{
                const {data:users} = await  axios.get("/api/users")
                    dispatch({
                        type:"AllUsers",
                        payload:users.users,
                    })                    
            }
        catch(err){
        } 
    }
    const getAllPosts = async()=>{
        try{
            const{data:posts} = await axios.get('/api/posts');
            dispatch({
                type:"AllPosts",
                payload:posts.posts
            })
        }
        catch(err){
            console.log(err);
        }
    }

    const getCurrentUser = () => {
        try{
            const userData = JSON.parse(localStorage.getItem("userData"));
            dispatch({
                type:"currentUser",
                payload:userData
        })
        }
        catch(err){
            console.log(err);
        }
    }

    const getAllBookmarks = async()=>{
        try{
            const{data:bookmark} = await axios.get('/api/users/bookmark',
                {headers:{authorization:encodedToken}}); 
            
            dispatch({
                type: 'getBookmarks',
                payload: bookmark.bookmarks,
            })
        }
        catch(err){
            console.log(err);
        }
    }

    const createPost = async (postData) => {
        try {
            const response = await fetch(`/api/posts`, {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify(postData)
            })
            const responseData = (await response.json())?.posts
            dispatch({
                type:"AllPost",
                payload:responseData,
            })
            toast.success(`Posted successfully`);
        } catch (error) {
            console.error(error);
        }
    }




    

    return(
        <DataContext.Provider value={{
            state,
            allUsers: state.allUsers,
            allPosts: state.allPosts,
            bookmarks: state.bookmarks,
            currentuser: state.currentuser,
            followedUser: state.followedUser,
            searchPost: state.searchPost,
            searchUser: state.searchUser,
            active: state.active,
            dataDispatch: dispatch,
            getAllUsersHandler,
            getCurrentUser,
            getAllPosts,
            getAllBookmarks,
            createPost,
        }}>
            {children}
        </DataContext.Provider>
    )
}