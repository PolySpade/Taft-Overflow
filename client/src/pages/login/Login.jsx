import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => { 
    e.preventDefault();

    const formData = {
        username,
        password
    };
    
    axios.post("http://localhost:4000/api/login", formData, { withCredentials: true })
        .then(response => {
            // Handle success
            console.log(response.data);
            alert("Login successfull!");
            window.location.href = "/";
        })
        .catch(error => {
            // Handle error
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              alert(`Error: ${error.response.data.message}`);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          });
        
    console.log(formData);
  };

  return (
    <div className="login__container-container">
    <div className="login__container">
      <div className="login__welcome">Welcome to</div>
      <div className="login__title">Taft Overflow</div>
      <div className="login__content">
        <form onSubmit={handleSubmit}>
          <div className="login__user-details">
            <div className="login__user-details__input-box__username">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login__user-details">
              <div className="login__user-details__input-box__password">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="login__user-details__remember-me">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                 <span>Remember me</span>
                </label>
              </div> */}
            </div>
          </div>
          <div className="login__login-button">
            <div className="login__login-button__button">
              <input type="submit" value="Login" />
            </div>
            <div className="login__login-button__login">
              Not a member? <Link to='/register'>Sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;