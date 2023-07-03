import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.scss";
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();

    const [signupInputValues, setSignupInputValues] = useState({ user_email: '', password: '', username: '', firstName: '', lastName: '' })
    const [isValid, setIsValid] = useState({ isEmail: false, isPassword: false, isUsername: false, isName: false })
    const [showErrors, setShowErrors] = useState(false);

    const { signUp, isLoggedIn } = useContext(AuthContext)

    const isEmail = (email) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(email);

    const validateForm = (event) => {
        if (event.target.id === 'email') {
            setIsValid({ ...isValid, isEmail: isEmail(event.target.value) })
        }
        if (event.target.id === 'pass') {
            setIsValid({ ...isValid, isPassword: (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(event.target.value)) })
        }
        if (event.target.id === 'username') {
            setIsValid({ ...isValid, isUsername: event.target.value.length > 0 })
        }
        if (event.target.id === 'firstName') {
            setIsValid({ ...isValid, isName: event.target.value.length >= 2 })
        }
    }

    
    const signUpClickHandler = (e) => {
      e.preventDefault();
        setShowErrors(true)
        signUp(signupInputValues, isValid)
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  return (
    <div className="signup-page">
                {isLoggedIn ? navigate('/') :
                <div className="signup-modal">
                    <p className="signup-heading">
                        Sign Up
                    </p>
                    <form action="submit" className="signup" onChange={validateForm}>
                        <div className="input-field-container">
                            <label className="first-name">
                                <div className="field">
                                    <span className="input-title">First Name: </span>
                                    <input type="text" name="" id="firstName"
                                        onChange={(event) => setSignupInputValues({ ...signupInputValues, firstName: event.target.value })}
                                    />
                                </div>
                                {showErrors && !isValid?.isName && <p className="name-error error">name should be at least two letters long</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="last-name">
                                <div className="field">
                                    <span className="input-title">Last Name: </span>
                                    <input type="text" name="" id="lastName"
                                        onChange={(event) => setSignupInputValues({ ...signupInputValues, lastName: event.target.value })}
                                    />
                                </div>
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="username">
                                <div className="field">
                                    <span className="input-title">Username: </span>
                                    <input type="text" name="" id="username"
                                        onChange={(event)=>  setSignupInputValues({ ...signupInputValues, username: event.target.value })}
                                    />
                                </div>
                                {showErrors && !isValid?.isUsername && <p className="username-error error">username can't be empty</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="email">
                                <div className="field">
                                    <span className="input-title">Email: </span>
                                    <input type="email" name="" id="email"
                                        onChange={(event)=>setSignupInputValues({ ...signupInputValues, user_email: event.target.value })}
                                    />
                                </div>
                                {showErrors && !isValid?.isEmail && <p className="email-error error">Please enter a valid email address.</p>}
                            </label>
                        </div>
                        <div className="input-field-container">
                            <label className="password">
                                <div className="field">
                                    <span className="input-title">Password: </span>
                                    <input type="password" name="" id="pass"
                                        onChange={(event)=> setSignupInputValues({ ...signupInputValues, password: event.target.value })}
                                    />
                                </div>
                                {showErrors && !isValid?.isPassword && <p className="password-error error">password should contains atleast 8 characters and should contain at least one special and one numeric character.</p>}
                            </label>
                        </div>
                    </form>
                    <button className="signup-btn" onClick={signUpClickHandler}>
                        Sign Up
                    </button>
                </div>}
            </div>
    )
};

export default SignUp;
