import { createContext, useState, useContext } from "react";
import {toast} from "react-toastify";



export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage?.getItem('encodedToken')?.length>0);
    const [currentUser, setCurrentUser] = useState({});

    const userData = JSON.parse(localStorage.getItem('userData'));
  
    const login = async(e, username, password)=>{
         e.preventDefault();
        try{
            const creds = {
                username:username,
                password:password,
            }
            const response = await fetch('/api/auth/login',{
            method:'POST',
            body: JSON.stringify(creds),
            });
            const data = await response.json();
            if (data?.encodedToken) {
                localStorage.setItem('encodedToken', data?.encodedToken);
                localStorage.setItem('userData', `${JSON.stringify(data?.foundUser)}`)
                setIsLoggedIn(true)
                setCurrentUser(JSON.parse(localStorage.getItem('userData')));
                toast.success("Successfully logged in");
                          
            }
            else {
                toast.error("Invalid username or password");
                    
            }
        }
        catch(err){
            console.log("error", err);
        }
    }

    const guestLogin = async()=>{
        try {
            const guestCreds = {
                username:"praveenkumar",
                password:"!@12QWqw",
            }

            const response = await fetch('/api/auth/login',{
                method: "POST",
                body: JSON.stringify(guestCreds)});

                const data = await response.json();
            
                localStorage.setItem('encodedToken', data?.encodedToken);
                localStorage.setItem('userData', `${JSON.stringify(data?.foundUser)}`);
                setIsLoggedIn(true)
                setCurrentUser(JSON.parse(localStorage.getItem('userData')));
                toast.success(`Welcome ${data?.foundUser?.firstName } ${data?.foundUser?.lastName}`)
                    
            }
        catch(err){
            console.log("error", err);
        }
    }

    const signUp = async (signupInputValues, isValid) => {
       
        if (isValid?.isEmail && isValid?.isPassword && isValid?.isUsername && isValid?.isName) {
            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify(signupInputValues)
                });
                const data = await response.json();
                console.log(" sign up data", data);
                if (data?.encodedToken) {
                    localStorage.setItem('encodedToken', data?.encodedToken);
                    localStorage.setItem('userData', `${JSON.stringify(data?.createdUser)}`)
                    setIsLoggedIn(true)
                    setCurrentUser(localStorage.getItem('userData'));
                    toast.success(`Welcome ${data?.createdUser?.firstName } ${data?.createdUser?.lastName}`)
                    // dataDispatch({
                    //     type:"Add-new-user",
                    //     payload: data.createdUser,
                    // })
                } else {
                    toast.error(`Error ${response?.status}: ${data?.errors[0]}`);
                }

            } catch (error) {
                console.error(error);
            }
        }
    }



    const logout = ()=>{
        localStorage.clear();
        setIsLoggedIn(false);
        toast.warn(`${userData?.firstName} ${userData?.lastName} Logged out`);
    }
    

    return(
        <AuthContext.Provider value={{login,currentUser, setCurrentUser, signUp, isLoggedIn, guestLogin, logout, userData}}>
            {children}
        </AuthContext.Provider>
    )
}

