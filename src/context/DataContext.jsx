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

    const getAllUsersHandler = async()=>{
        try{
                const {data:users} = await  axios.get("/api/users")
                    dispatch({
                        type:"AllUsers",
                        payload:users.users,
                    })

                    const {data:posts} = await axios.get("/api/posts")
                    dispatch({
                        type:"AllPosts",
                        payload:posts.posts,
                    })
                    
            }
        catch(err){
        } 
    }

    const getCurrentUser = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        dispatch({
            type:"currentUser",
            payload:userData
        })
    }



    useEffect(()=>{
        getAllUsersHandler();
        getCurrentUser();
    },[]);

    

    return(
        <DataContext.Provider value={{
            allUsers: state.allUsers,
            allPosts: state.allPosts,
            bookmarks: state.bookmarks,
            post: state.post,
            currentuser: state.currentuser,
            followedUser: state.followedUser,
            dataDispatch: dispatch
        }}>
            {children}
        </DataContext.Provider>
    )
}