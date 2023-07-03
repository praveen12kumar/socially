import {useEffect, useContext,useReducer, createContext, useState } from "react";
import axios from "axios";

import { dataReducer } from "../reducers/DataReducer";


export const DataContext = createContext();

export const DataProvider = ({children})=>{
    
    const initialValues = {
        allUsers: [],
        allPosts: [],
        bookmarks: [],
        currentuser:{},
        followedUser:[],
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



    // useEffect(()=>{
    //     getAllUsersHandler();
    //     getCurrentUser();
    //     getAllPosts();
    //     getAllBookmarks();
    // },[]);

    

    return(
        <DataContext.Provider value={{
            state,
            allUsers: state.allUsers,
            allPosts: state.allPosts,
            bookmarks: state.bookmarks,
            currentuser: state.currentuser,
            followedUser: state.followedUser,
            dataDispatch: dispatch,
            getAllUsersHandler,
            getCurrentUser,
            getAllPosts,
            getAllBookmarks,
        }}>
            {children}
        </DataContext.Provider>
    )
}