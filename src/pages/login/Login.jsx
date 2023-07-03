import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();

  const { login, guestLogin} = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

    const loginHandler = (e)=>{
        login(e, username, password);
        
    }


  const handleGuestLogin = () => {
    setUsername("adarshbalika");
    setPassword("adarshBalika123");

    guestLogin();
  };

  const signUpClickHandler = () => {
    navigate("/SignUp");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-section">
          <p>Login</p>
          <form action="" className="login-form">
            <div className="input-field-container">
              <label htmlFor="email" className="username">
                Username
              </label>
              <input
                type="text"
                name=""
                value={username}
                id="email"
                placeholder="xyz@gmail.com"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-field-container">
              <label htmlFor="password" className="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name=""
                value={password}
                id="password"
                placeholder="*************"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiHide/> : <BiShow/>}
            </div>
          </form>
          <div className="button-container">
            <div className="login-guest">
              <button
                className="login"
                onClick={(e)=>loginHandler(e)}
              >
                Login
              </button>
              <button className="guest" onClick={handleGuestLogin}>Login as Guest</button>
            </div>
            <div className="signup-btn">
              <button className="signup" onClick={signUpClickHandler}>
              {`Create an Account >`}
              </button>
            </div>
          </div>
        </div>
        <div className="side-image-section">
          <img src="https://i.ibb.co/8zNPYc6/social-media.jpg" alt="" className="image-container" /> 
        </div>
      </div>
    </div>
  );
};

export default Login;
